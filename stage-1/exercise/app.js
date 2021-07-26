/*
 * Exercise: Refactor the code!
 *
 * This script file contains a small front-end app that queries the
 * StackOverflow API. It works, but the code is not ideal; there is a lot of
 * work to do to clean it up.
 *
 * First take a few minutes to understand what the code is doing, then use what
 * you have learned in the preceding stage-1 exercises to refactor the app.
 *
 * Take your time, and think about what principles you are trying to apply while
 * you are refactoring.
 */
// just we will do refactoring wow !!!
'use strict';
//constants - variables
 const STACK_OVERFLOW_API_URL = 'https://api.stackoverflow.com/2.2/';
 const FORM_unanswered = document.querySelector('#form-unanswered');
  const FORM_answerers = document.querySelector('#form-answerers');

// function to get the data from the API
function getData(url, cb){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      cb(JSON.parse(xhr.responseText));
    } else {
      console.log('Status Code: ' + xhr.status);
    }
  });
   xhr.open('GET', url);
   xhr.send();
}
// to handle form 
function handleForm(e,cb){
  e.preventDefault();
  const form = e.target;
  const tags  = form.querySelector('input[name=tags]').value;
  cb(tags);
}

FORM_unanswered.addEventListener('submit',handleForm(e,(tags)=>{
  var tags = form.querySelector('input[name=tags]').value;
var url  = `${STACK_OVERFLOW_API_URL}questions/unanswered?order=desc&sort=activity&site=stackoverflow&tagged=` + tags;
       var response = getData(url,(response)=>{
      document.querySelector('#results-summary').innerHTML = ''
        + '<p>'
        + 'Query of ' + tags +  ' returned ' + response.items.length + ' results'
        + '</p>';

      document.querySelector('#results-body').innerHTML = response.items.map(function (item) {
        return ''
          + '<div>'
          + '<p>Title: ' + item.title + '</p>'
          + '<p>Date: ' + new Date(item.creation_date) + '</p>'
          + '<p>Link: <a href="' + item.link + '">Click here</a></p>'
          + '<p>Owner: ' + item.owner.display_name + '</p>'
          + '</div>'
      })
      .join('<br>');
    });

}));


FORM_answerers.addEventListener('submit',handleForm(e,(tags)=>{
  var tags = form.querySelector('input[name=tags]').value;
 const url  = STACK_OVERFLOW_API_URL + tag + '/top-answerers/all_time?site=stackoverflow'
       getData(url,(response)=>{
      document.querySelector('#results-summary').innerHTML = ''
        + '<p>'
        + 'Query of ' + tags +  ' returned ' + response.items.length + ' results'
        + '</p>';

      document.querySelector('#results-body').innerHTML = response.items.map(function (item) {
        return ''
          + '<div>'
          + '<p>User: ' + item.user.display_name + '</p>'
          + '<p>Reputation: ' + item.user.reputation + '</p>'
          + '<p>Profile: <a href="' + item.user.link + '">Click here</a></p>'
          + '<p>Score: ' + item.score + '</p>'
          + '</div>'
      })
      .join('<br>');
   })
}));


