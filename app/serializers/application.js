import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {


 /* normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (!payload.data) {
      payload.data = {};
    }

    payload.data.type = requestType;
    payload.data.id = payload.id;
    payload.data.attributes = {
      title: payload.title,
      owner: payload.owner,
      city: payload.city,
      category: payload.category,
      bedrooms: payload.bedrooms,
      iamge: payload.image,
      description: payload.description,
    };

    return super.normalizeResponse(...arguments);
  }*/
}
