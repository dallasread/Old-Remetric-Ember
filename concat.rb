`cat dist/assets/remetric.js >> dist/assets/vendor.js`
`uglifyjs dist/assets/vendor.js -o dist/assets/rm.js`
`mv dist/assets/remetric.css dist/assets/rm.css`