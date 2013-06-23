Searches twits all over twitter with given options

Example:
```javascript
jQuery.searchTwitter({
    search: 'Tweet of the day'
    limit: '5',
    wrapWith: '<li></li>',
    animateWith: 'slideToggle',
    animateSpeed: 1000,
    refresh: 2000,  // in miliseconds
    onComplete: function() {
      console.log('Twitter search is done')
    }
});
```