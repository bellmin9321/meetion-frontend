/// <reference types="cypress" />

describe('Meetion E2E Test', () => {
  const email = Cypress.env('credential-email');
  const password = Cypress.env('credential-pwd');

  beforeEach(() => {
    cy.log(`Visiting Meetion`);
    cy.visit('/');
    cy.wait(1500);
    cy.login(email, password);
  });

  it('새로운 페이지 생성 후 제목과 설명 작성', () => {
    cy.contains('김종민의 Meetion');
    cy.contains('로그아웃');
    cy.contains('새 페이지').click();
    cy.wait(2500);
    cy.get('#title').type('새로운 페이지입니다');
    cy.get('#desc').type('설명을 작성해주세요\n문단으로 작성 가능합니다.');
  });

  it('작성한 페이지 삭제', () => {
    cy.get('ul > li')
      .last()
      .within(($list) => {
        if ($list.find('.mr-4').length) cy.get('#deleteBtn').click();
      });
  });

  it('페이지 공유하기', () => {
    cy.contains('김종민의 Meetion');
    cy.contains('로그아웃');
    cy.contains('새 페이지').click();
    cy.wait(2700);
    cy.get('#title').type('공유할 페이지입니다');
    cy.get('#desc').type('공유 버튼을 클릭 후 이메일을 입력 후 초대해주세요');
    cy.get('.right-0 > .flex > :nth-child(2)').click();
    cy.get('input[name="invitedEmail"]').type('woony56@naver.com');
    cy.get('#inviteBtn').click();
    cy.wait(1500);
  });
});

export {};
