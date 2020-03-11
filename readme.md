# DeepMind Coding Test

**To run**
Simply open the build folder's index.html in a browser.

## Notes

- My knowledge of front-end frameworks is primarily React, but since Jonathan explained that DeepMind uses Angular, I decided it might be better to write the app in vanilla JS (TS). 

- This obviously was much less efficient, and I think messier than it would be with a framework. Nonetheless, I used an MVC pattern to provide some structure. 

- I haven't included tests as per the spec, but the code is fairly modular and amenable to testing.

- I deliberately chose not to load the agents into state and then select from there to avoid further API calls, because then there would only ever be one API call and so practically no possibility of errors occuring (to show error handling).

## Technologies:
- Webpack
- TS
- Sass
