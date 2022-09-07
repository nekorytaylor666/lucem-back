// usage: _.removeDeepByKey(someObject, 'unwantedKey');
import _ from "lodash";
_.mixin({
  removeDeepByKey: function (obj, keyToBeRemoved) {
    return _.transform(obj, function (result, value, key) {
      if (_.isObject(value)) {
        value = _.removeDeepByKey(value, keyToBeRemoved);
      }
      if (key !== keyToBeRemoved) {
        _.isArray(obj) ? result.push(value) : (result[key] = value);
      }
    });
  },
});
