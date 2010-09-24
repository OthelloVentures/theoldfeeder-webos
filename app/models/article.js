var Article = Class.create({
  initialize: function(data) {
    this.title = data.title
    var content = data.content || data.summary
    this.summary = this.cleanUp(content.content)
    this.setReadState(data.categories)
    this.setDates(parseInt(data.crawlTimeMsec))
  },
  
  cleanUp: function(content) {
    var cleaned = content.replace(/<script.*?<\/script.*?>/g , "")
    cleaned = cleaned.replace(/<iframe.*?<\/iframe.*?>/g , "")
    cleaned = cleaned.replace(/<object.*?<\/object.*?>/g , "")
    return cleaned
  },
  
  setReadState: function(categories) {
    this.isRead = false
    
    categories.each(function(category) {
      if(category.endsWith("/state/com.google/read")) {
        this.isRead = true
        return
      }
    }.bind(this))
  },
  
  setDates: function(milliseconds) {
    this.updatedAt = new Date(milliseconds)
    var month = this.leftPad(this.updatedAt.getMonth() + 1)
    var day = this.leftPad(this.updatedAt.getDate())
    var year = "" + this.updatedAt.getFullYear()
    
    this.displayDate = month + "/" + day + "/" + year
    this.sortDate = year + month + day
  },
  
  leftPad: function(number) {
    var s = "0000" + number
    return s.substr(s.length - 2)
  }
})