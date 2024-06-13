import GenrateTimeQuery from "./time_query";

const GenrateQuery = (props) => {
  var filter = props.filter;
  var query = `?page=${props.page}&page_size=${props.size}`;

  // Add other filters
  if (filter) {
    var keys = Object.keys(filter);
    for (var i = 0; i < keys.length; i++) {
      var item = filter[keys[i]];
      var type = typeof item;
      if (keys[i] === "created_on" || keys[i] === "updated_on") {
        query += GenrateTimeQuery(item, keys[i]); // generating time query
      } else if (item && item.length !== 0 && type === "object") {
        query += `&${keys[i]}__in=`;
        for (var j = 0; j < item.length; j++) {
          query += item[j].value + ",";
        }
      } else if (type === "string" && item && item.length > 0) {
        query += `&${keys[i]}__contains=${item}`;
      }
    }
  }

  // Add sorting parameters if available
  if (props.order && props.order.field && props.order.dir) {
    // Append ordering parameter after other filters
    query += `&ordering=${props.order.dir === "asc" ? "" : "-"}${
      props.order.field
    }`;
  }

  return query;
};

export default GenrateQuery;
