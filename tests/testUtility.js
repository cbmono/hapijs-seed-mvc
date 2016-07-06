/**
 * Wraps the tests into a async try-catch
 *
 * @param {Function} An anonymous function that wraps the tests
 * @param {Function} jasmine's done
 */
export default async (tests, done) => {
  try {
    await tests();
  }
  catch (e) {
    console.error(e);
  }
  finally {
    done();
  }
};
