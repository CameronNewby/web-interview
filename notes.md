# NOTES

## How long did it take?

- 7 Hours (On & Off over a few days)

## Overview
- provide an overview of how you approached this challenge

- Restructured project folders to seperate stateless and stateful components.
- Trying to take design and see where i can create reusable components.
- Refactored JSX structure, created seperate component for New Appiontmnet and added basic layout structure.
- Left App.js component basic so that router functionality could be added when building out navigation.
- Next step was to get intial components and styles to align up to design.
- Then i went on to build event handlers to update state etc
- Finally went on to intergrating axios requests to populate components 

## Trade Offs
- I tried to give even coverage to everything, but i traded possibly on state managemtn it could be cleaned up as there are alot of
state objects in NewAppointment container. Also the handling of errors is very basic would be nice to create overlay to display errors.

- I would also like to break out the components more i created a section component and my idea was that this would, be part of a Card component.
Which would allow you to build a card layout like we have here with Header, Section and Footer this could then be reused on other screens

## Next Steps
- Add better error handling, possible Modal/Overlay to display them.
- Migrate to redux (might do this in branch if i get time)
- Clear content on sucessful book submission and maybe take user to bookings page
- Add a few more test to get full coverage

## General Feedback

- Everything was pretty clear, think the data you ask to be posted to server should match whats already on there.