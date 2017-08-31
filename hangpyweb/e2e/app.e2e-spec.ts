import { HangpywebPage } from './app.po';

describe('hangpyweb App', function() {
  let page: HangpywebPage;

  beforeEach(() => {
    page = new HangpywebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
