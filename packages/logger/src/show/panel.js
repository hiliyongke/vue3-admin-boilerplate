import ShowPage from './showpage';

function Panel(logger) {
  this.logger = logger;
}

Panel.prototype = {
  init() {
    const showPage = new ShowPage(this.logger.report.bind(this.logger));

    document.addEventListener('keydown', (event) => {
      event = event || window.event;
      if (event.ctrlKey && parseInt(event.key, 10) === 6) {
        showPage.toggleShow();
      }
    });
  },
};

export default Panel;
