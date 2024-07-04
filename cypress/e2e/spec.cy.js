describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Edita uma tarefa com clique duplo', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Tarefa para editar{enter}');

    cy.get('.todo-list li')
      .first()
      .dblclick();

    cy.get('.todo-list li')
      .first()
      .find('input.edit')
      .should('have.value', 'Tarefa para editar')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('.todo-list li')
      .first()
      .should('contain', 'Tarefa editada');
  });

  it('Limpa todas as tarefas completadas', () => {
    cy.visit('http://127.0.0.1:7001');
    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
    cy.get('.todo-list li .toggle').eq(0).click();
    cy.get('.todo-list li .toggle').eq(2).click();
    cy.get('.todo-list li').should('have.length', 3);
    cy.contains('Clear completed').click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').should('have.text', 'Tarefa 2');
  });

  it('Marca todas as tarefas como concluídas clicando na seta para baixo', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');

    cy.get('.toggle-all-label').click(); // Altere para o seletor correto da seta para baixo

    cy.get('.todo-list li')
      .should('have.length', 3)
      .each(($el) => {
        cy.wrap($el).should('have.class', 'completed');
      });
  });
});