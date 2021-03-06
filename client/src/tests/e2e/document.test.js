// const config = require('../../../../nightwatch.conf.js');

// module.exports = {
//   'Create Document': function (browser) {
//     browser
//       .url('http://localhost:5050/app/')
//       .waitForElementVisible('body')
//       .click('a.login-btn')
//       .setValue('input[type=text]', 'kez')
//       .setValue('input[type=password]', 'kez')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.center')
//       .assert.containsText('div.center', 'Login Successful')
//       .saveScreenshot('screenshots/loginPage.png')
//       .pause(1500)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .waitForElementVisible('body')
//       .click('a#createDoc')
//       .waitForElementVisible('div#modal')
//       .pause(1000)
//       .waitForElementVisible('div#createDocModal')
//       .assert.elementPresent('h4')
//       .assert.containsText('h4#eh4', 'Create a Document')
//       .useXpath()
//       .setValue('(//input[@id="title"])[2]', 'Issa Title')
//       .useCss()
//       .pause(1500)
//       .click('select[id="access"] option[value="private"]')
//       .execute('tinyMCE.activeEditor.setContent("This is my new content!")')
//       .click('button#done')
//       .pause(1000)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .assert.elementPresent('table')

//       .waitForElementVisible('table#document-list')
//       .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Issa Title')
//       .end();
//   },
//   'Edit Document': function (browser) {
//     browser
//      .url('http://localhost:5050/app/')
//       .waitForElementVisible('body')
//       .click('a.login-btn')
//       .setValue('input[type=text]', 'kez')
//       .setValue('input[type=password]', 'kez')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.center')
//       .assert.containsText('div.center', 'Login Successful')
//       .saveScreenshot('screenshots/loginPage.png')
//       .pause(1500)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .click('table#document-list tbody tr:first-of-type a#edit-btn')
//       .waitForElementVisible('div#modal')
//       .pause(1000)
//       .waitForElementVisible('div#createDocModal')
//       .clearValue('input#title')
//       .setValue('input#title', 'Issa One More Title')
//       .click('button[type="submit"]')
//       .pause(1000)
//       .click('a#done')
//       .pause(1000)
//       .assert.urlEquals(`http://localhost:5050/app/dashboard?title=Issa+One+More+Title&action=`)
//       .assert.elementPresent('table')
//       .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Issa One More Title')
//       .end();
//   },
//   'Delete Document': function (browser) {
//     browser
//       .url('http://localhost:3000')
//       .waitForElementVisible('body')
//       .setValue('input[type=email]', 'moncateyes@yahoo.com')
//       .setValue('input[type=password]', '123456')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.login-feedback')
//       .assert.containsText('div.login-feedback', 'Login Successful')
//       .pause(1000)
//       .click('table#document-list tbody tr:first-of-type i.edit-btn')
//       .waitForElementVisible('body')
//       .clearValue('input#title')
//       .setValue('input#title', 'Chosen One')
//       .click('button[type="submit"]')
//       .pause(1000)
//       .assert.urlEquals('http://localhost:3000/dashboard')
//       .waitForElementVisible('body')
//       .click('table#document-list tbody tr:first-of-type i.delete-btn')
//       .pause(500)
//       .waitForElementVisible('button.confirm')
//       .click('button.confirm')
//       .expect.element('table#document-list tr:first-of-type>td.doc-title').text.to.not.equal('Chosen One');
//     browser.end();
//   }
// };