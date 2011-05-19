jQuery.fn.todoElem = function (name) {
  return $(this).find("li").filter(function () {
    return $(this).text() === name;
  });
};
