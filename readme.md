# Poltio UX Improvements Mockup

This repository is a mockup for the new iteration of card interactions on Poltio.com. The code here is meant for mockup purposes, to explain the new design, and not as production code. Please keep this in mind for further development.

---

*Status*: As of December 2017, the [Embed mockup page](http://poltio-ux.ga/embed.html) has been prepared for implementation, and contans all the desgn variations. The [Feed page](http://poltio-ux.ga/) might not contain all variations.

---

## Mockup Structure

There are 2 main pages: [Feed](http://poltio-ux.ga/) and [Embeds](http://poltio-ux.ga/embed.html). In both cards the designed element is a `.card`; anything outside the card is not part of the redesign.


## Variations

### Card types
1. Poll (Single question)
2. Test (Multiple questions)
3. Quiz (Multiple questions)


### Question types
1. With cover image
2. Without cover image (remove `<img>` element, but leave an empty `<figure class="card__q-image">` element)


### Answer types
1. Yes/No
2. Multiple Choice Text
3. Multiple Choice Image
4. Score

---

## (S)CSS

The styling is contained in the `scss` folder, and roughly follows the structure of the style organisation of Poltio.com. 

- The folder `elements` contains all low-level elements, like button, field, dropdown and badge.
- The folder `components` contains the larger components on the page, that can be composed of different sections and can contain other elements. For now there is only the card component, with 5 sections (in order):
	- card
		- card-header
		- card-question
		- card-answer
		- card-followup
		- card-footer

NB. The `legacy` file contans peripheral styling. It is up to the developer how this gets implemented

NB.2 The styling is 'vanilla' css; only scss is used to cut up the styling to make implementation easier. Since this is a mockup repo, there might be some old code. Feel free to [ask me if you have any questions](https://ldaniel.eu/contact).

— by [ldaniel.eu](https://ldaniel.eu/)
