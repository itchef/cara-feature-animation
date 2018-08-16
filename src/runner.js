const createTestCafe = require("testcafe");
const glob = require("glob");
let testcafe = null;
let runner = null;

if (!process.env.CI)
    require('dotenv').config();

const suites = {
    fixture: './src/specs/fixtures/*.spec.js'
};

const getTests = async function (suite) {
    return new Promise(resolve => {
        glob(suite, (err, files) => resolve(files));
    })
};

const runTests = function (suite) {
    createTestCafe("localhost", 1338)
        .then((tc) => {
            testcafe = tc;
            runner = testcafe.createRunner();
        })
        .then(() => getTests(suite))
        .then((testFiles) => {
            return runner
                .src(testFiles)
                .browsers(["chrome:headless"])
                .screenshots("reports/screenshots/", true)
                .reporter("spec")
                .run()
        })
        .then((failed) => {
            console.log("\n\n\nNumber of tests failed: " + failed);
            testcafe.close();
        })
};

runTests(suites.fixture);