module.exports.getdate = function(){

  let day = new Date();
  let options = {
     weekday: 'long',
     year: 'numeric', month: 'long', day: 'numeric'
  }

return day.toLocaleDateString('en-us', options);
}
