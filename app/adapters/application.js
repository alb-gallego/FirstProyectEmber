import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';

  buildURL(...args) {
    return `${super.buildURL(...args)}.json`;
  }

  /**  host = 'http://localhost:3000';

  namespace = 'rentals'; */
}
