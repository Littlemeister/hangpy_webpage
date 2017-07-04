import { HangangularPage } from './app.po';

describe('hangangular App', () => {
  let page: HangangularPage;

  beforeEach(() => {
    page = new HangangularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
