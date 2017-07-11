import { HangpyangularPage } from './app.po';

describe('hangpyangular App', () => {
  let page: HangpyangularPage;

  beforeEach(() => {
    page = new HangpyangularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
