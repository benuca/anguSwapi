# Planning

- Review instructions and mock

- How should I divide the UI into components?
- What should the component hierarchy be?
- What Kendo UI components should I leverage & where do they fit in the angular components?
- What's the most likely routing configuration I will use?
- Do I need to make this responsive?
  - I don't think so, mobile view doesn't seem to be part of this

# Development

- Generate app (ng new)

- Some basic styling on main app component

  - position roughly center-left of desktop screen based on mock

- Build nav component

  - considered using Kendo TabStrip, ButtonGroup seemed like a better fit
  - added some basic styling based on mock (color, box shadow)

- Generate 'list' components for planets, characters, starships

  - just skeleton components for now

- Build basic routing funtionality to switch between list components using nav

- Start buidling planet-list component with Kendo grid & live data from star wars api

  - make sortable, and not scrollable
  - since all 3 list components would all use Kendo grid,
    I could make a shared service that provides data & features to each list component,
    for now I will keep the component logic in the respective components
  - there is a bug when sorting numeric fields where it sorts by first character instead of
    numeric amount, probably due to the values being passed in as strings, will also fix
    towards the end if I have time

- Write logic for displaying only 5 biggest planets

- Using similar logic/templates, build the characters and starships lists

  - for characters, display the first 5 under 40 years old by heaviest mass to lightest
  - for starships, display the 5 smallest crewed
  - save loaded & completed data to local storage to make data persist

- Implement Kendo loader for lists while waiting for API responses

- Build simple 'side card'

- Make 'detail' components for planets, characters, starships

- Make 'list' grid rows clickable and redirect to respective detail components

- Build detail components

  - Use Kendo card and fill with data relevant to planet/character/starship name
  - Implement loader for waiting for API calls

# Review

- Make sure everything works

  - remove console.logs, check for unused imports, etc..

- Known bugs (things I would fix given more time):

  - In 'list' components, numeric fields sort alphabetically instead of numerically due to being passed in as strings
  - The 'selected' nav color doesn't persist on page refresh

- Other things I would improve:

  - I'd refactor the http requests to use observables/rxjs more to be more asyncronous
  - Move some repeated component functionality out to services and/or shared components (i.e getFilmsData)
  - Add unit tests
  - Go over typing and make it more strict (used 'any' in some places) - possibly make models for planet, character, starship
