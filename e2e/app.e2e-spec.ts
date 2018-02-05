import { RSSfeedPage } from './app.po';

describe('rssfeed App', function() {
  let page: RSSfeedPage;

  beforeEach(() => {
    page = new RSSfeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
