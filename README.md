# Ombudsman

The [Office of the State Long-Term Care Ombudsman (Georgia)](https://www.georgiaombudsman.org/) works to advocate for the concerns of residents in long-term care facilties. This website provides a means to host and search through legal documents that may be relevant for this purpose.

The production branch is hosted on Zeit Now at [https://ombudsman-dev.now.sh/](https://ombudsman-dev.now.sh/). 

We're using Firebase as the database (contact us for the URL). There's no authentication being used at the moment.

To install dependencies, run `npm install` in the directory where you've cloned this repo.

To deploy this locally, run

```
npm run dev
```

# nextjs-starter template

From https://github.com/GTBitsOfGood/nextjs-starter/ 

## Stack
* React.js: Front-end
* Next.js: API routes and server-side rendering
* Firebase: Storing information and files
* Zeit Now: Hosting and automatic GitHub build hooks
* eslint: Automatically identifying and fixing code errors
* prettier: Setting a common code style and fixing any issues

## Setup

### Zeit Now Install

- [Create a Zeit Now account](https://zeit.co)
- Run `npm i -g now`, then type `now login`
- On your dashboard, click `New Project` then `From GitHub` and select this project

### Updating Env Vars
- For dev, update `.env` and `next.config.js`
- For production, install Now using the instructions above, then
- For production, to add, use `now secrets add <secret-name> <secret-value>`
- For production, to remove, use `now secrets rm <secret-name>`

### Development
- Clone this project to your computer
- Navigate to this project in terminal and enter `npm install`
- Rename `example.env` to `.env` and fill it out with the dev config
- Run the dev version of this project by entering `npm run dev`

### Styling
- By default, this repository uses Next `9.2.0` for styles, which includes native support for global CSS and CSS modules
- However, this version only allows global css to be in `pages/_app.js`, which can cause issues with external packages
- If you face this error, the solution is installing [`@zeit/next-css` and adding it to `next.config.js`](https://github.com/zeit/next-plugins/tree/master/packages/next-css), however you cannot use css modules and global css together with this package (and it defaults to global).
