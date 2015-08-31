module.exports = exp = {}

exp.appendToClass = appendToClass = (className, content) ->
  $(".#{className}").append(content)
