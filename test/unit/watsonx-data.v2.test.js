/**
 * (C) Copyright IBM Corp. 2023.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const WatsonxDataV2 = require('../../dist/watsonx-data/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const watsonxDataServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://ibmcloud/lakehouse/api/v2',
};

const watsonxDataService = new WatsonxDataV2(watsonxDataServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(watsonxDataService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('WatsonxDataV2', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WatsonxDataV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WatsonxDataV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WatsonxDataV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WatsonxDataV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = WatsonxDataV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WatsonxDataV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new WatsonxDataV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new WatsonxDataV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WatsonxDataV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('listBucketRegistrations', () => {
    describe('positive tests', () => {
      function __listBucketRegistrationsTest() {
        // Construct the params object for operation listBucketRegistrations
        const authInstanceId = 'testString';
        const listBucketRegistrationsParams = {
          authInstanceId,
        };

        const listBucketRegistrationsResult = watsonxDataService.listBucketRegistrations(listBucketRegistrationsParams);

        // all methods should return a Promise
        expectToBePromise(listBucketRegistrationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBucketRegistrationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listBucketRegistrationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listBucketRegistrationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBucketRegistrationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listBucketRegistrations(listBucketRegistrationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listBucketRegistrations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createBucketRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BucketDetails
      const bucketDetailsModel = {
        access_key: '<access_key>',
        bucket_name: 'sample-bucket',
        endpoint: 'https://s3.<region>.cloud-object-storage.appdomain.cloud/',
        secret_key: 'secret_key',
      };

      function __createBucketRegistrationTest() {
        // Construct the params object for operation createBucketRegistration
        const bucketDetails = bucketDetailsModel;
        const bucketType = 'ibm_cos';
        const catalogName = 'sampleCatalog';
        const description = 'COS bucket for customer data';
        const managedBy = 'ibm';
        const tableType = 'iceberg';
        const bucketDisplayName = 'sample-bucket-displayname';
        const bucketTags = ['read customer data', 'write customer data\''];
        const catalogTags = ['catalog_tag_1', 'catalog_tag_2'];
        const region = 'us-south';
        const state = 'active';
        const authInstanceId = 'testString';
        const createBucketRegistrationParams = {
          bucketDetails,
          bucketType,
          catalogName,
          description,
          managedBy,
          tableType,
          bucketDisplayName,
          bucketTags,
          catalogTags,
          region,
          state,
          authInstanceId,
        };

        const createBucketRegistrationResult = watsonxDataService.createBucketRegistration(createBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(createBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.bucket_details).toEqual(bucketDetails);
        expect(mockRequestOptions.body.bucket_type).toEqual(bucketType);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.managed_by).toEqual(managedBy);
        expect(mockRequestOptions.body.table_type).toEqual(tableType);
        expect(mockRequestOptions.body.bucket_display_name).toEqual(bucketDisplayName);
        expect(mockRequestOptions.body.bucket_tags).toEqual(bucketTags);
        expect(mockRequestOptions.body.catalog_tags).toEqual(catalogTags);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.state).toEqual(state);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketDetails = bucketDetailsModel;
        const bucketType = 'ibm_cos';
        const catalogName = 'sampleCatalog';
        const description = 'COS bucket for customer data';
        const managedBy = 'ibm';
        const tableType = 'iceberg';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBucketRegistrationParams = {
          bucketDetails,
          bucketType,
          catalogName,
          description,
          managedBy,
          tableType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createBucketRegistration(createBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBucketRegistration', () => {
    describe('positive tests', () => {
      function __getBucketRegistrationTest() {
        // Construct the params object for operation getBucketRegistration
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const getBucketRegistrationParams = {
          bucketId,
          authInstanceId,
        };

        const getBucketRegistrationResult = watsonxDataService.getBucketRegistration(getBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(getBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBucketRegistrationParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getBucketRegistration(getBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteBucketRegistration', () => {
    describe('positive tests', () => {
      function __deleteBucketRegistrationTest() {
        // Construct the params object for operation deleteBucketRegistration
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const deleteBucketRegistrationParams = {
          bucketId,
          authInstanceId,
        };

        const deleteBucketRegistrationResult = watsonxDataService.deleteBucketRegistration(deleteBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(deleteBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteBucketRegistrationParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteBucketRegistration(deleteBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateBucketRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateBucketRegistrationTest() {
        // Construct the params object for operation updateBucketRegistration
        const bucketId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateBucketRegistrationParams = {
          bucketId,
          body,
          authInstanceId,
        };

        const updateBucketRegistrationResult = watsonxDataService.updateBucketRegistration(updateBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(updateBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBucketRegistrationParams = {
          bucketId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateBucketRegistration(updateBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createActivateBucket', () => {
    describe('positive tests', () => {
      function __createActivateBucketTest() {
        // Construct the params object for operation createActivateBucket
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const createActivateBucketParams = {
          bucketId,
          authInstanceId,
        };

        const createActivateBucketResult = watsonxDataService.createActivateBucket(createActivateBucketParams);

        // all methods should return a Promise
        expectToBePromise(createActivateBucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/activate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createActivateBucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createActivateBucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createActivateBucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createActivateBucketParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createActivateBucket(createActivateBucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createActivateBucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createActivateBucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDeactivateBucket', () => {
    describe('positive tests', () => {
      function __deleteDeactivateBucketTest() {
        // Construct the params object for operation deleteDeactivateBucket
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const deleteDeactivateBucketParams = {
          bucketId,
          authInstanceId,
        };

        const deleteDeactivateBucketResult = watsonxDataService.deleteDeactivateBucket(deleteDeactivateBucketParams);

        // all methods should return a Promise
        expectToBePromise(deleteDeactivateBucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/deactivate', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDeactivateBucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDeactivateBucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDeactivateBucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDeactivateBucketParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDeactivateBucket(deleteDeactivateBucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDeactivateBucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDeactivateBucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBucketObjects', () => {
    describe('positive tests', () => {
      function __listBucketObjectsTest() {
        // Construct the params object for operation listBucketObjects
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const listBucketObjectsParams = {
          bucketId,
          authInstanceId,
        };

        const listBucketObjectsResult = watsonxDataService.listBucketObjects(listBucketObjectsParams);

        // all methods should return a Promise
        expectToBePromise(listBucketObjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBucketObjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listBucketObjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listBucketObjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBucketObjectsParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listBucketObjects(listBucketObjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listBucketObjects({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listBucketObjects();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('testBucketConnection', () => {
    describe('positive tests', () => {
      function __testBucketConnectionTest() {
        // Construct the params object for operation testBucketConnection
        const accessKey = '<access_key>';
        const bucketName = 'sample-bucket';
        const bucketType = 'ibm_cos';
        const endpoint = 'https://s3.<region>.cloud-object-storage.appdomain.cloud/';
        const region = 'us-south';
        const secretKey = 'secret_key';
        const authInstanceId = 'testString';
        const testBucketConnectionParams = {
          accessKey,
          bucketName,
          bucketType,
          endpoint,
          region,
          secretKey,
          authInstanceId,
        };

        const testBucketConnectionResult = watsonxDataService.testBucketConnection(testBucketConnectionParams);

        // all methods should return a Promise
        expectToBePromise(testBucketConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/test_bucket_connection', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.access_key).toEqual(accessKey);
        expect(mockRequestOptions.body.bucket_name).toEqual(bucketName);
        expect(mockRequestOptions.body.bucket_type).toEqual(bucketType);
        expect(mockRequestOptions.body.endpoint).toEqual(endpoint);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.secret_key).toEqual(secretKey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __testBucketConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __testBucketConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __testBucketConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessKey = '<access_key>';
        const bucketName = 'sample-bucket';
        const bucketType = 'ibm_cos';
        const endpoint = 'https://s3.<region>.cloud-object-storage.appdomain.cloud/';
        const region = 'us-south';
        const secretKey = 'secret_key';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const testBucketConnectionParams = {
          accessKey,
          bucketName,
          bucketType,
          endpoint,
          region,
          secretKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.testBucketConnection(testBucketConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.testBucketConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.testBucketConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDriverDatabaseCatalog', () => {
    describe('positive tests', () => {
      function __createDriverDatabaseCatalogTest() {
        // Construct the params object for operation createDriverDatabaseCatalog
        const databaseDisplayName = 'testString';
        const databaseType = 'testString';
        const catalogName = 'testString';
        const hostname = 'testString';
        const port = 'testString';
        const driver = Buffer.from('This is a mock file.');
        const driverContentType = 'testString';
        const driverFileName = 'testString';
        const certificate = 'testString';
        const certificateExtension = 'testString';
        const ssl = 'testString';
        const username = 'testString';
        const password = 'testString';
        const databaseName = 'testString';
        const description = 'testString';
        const createdOn = 'testString';
        const authInstanceId = 'testString';
        const createDriverDatabaseCatalogParams = {
          databaseDisplayName,
          databaseType,
          catalogName,
          hostname,
          port,
          driver,
          driverContentType,
          driverFileName,
          certificate,
          certificateExtension,
          ssl,
          username,
          password,
          databaseName,
          description,
          createdOn,
          authInstanceId,
        };

        const createDriverDatabaseCatalogResult = watsonxDataService.createDriverDatabaseCatalog(createDriverDatabaseCatalogParams);

        // all methods should return a Promise
        expectToBePromise(createDriverDatabaseCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_driver_registrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.formData.database_display_name).toEqual(databaseDisplayName);
        expect(mockRequestOptions.formData.database_type).toEqual(databaseType);
        expect(mockRequestOptions.formData.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.formData.hostname).toEqual(hostname);
        expect(mockRequestOptions.formData.port).toEqual(port);
        expect(mockRequestOptions.formData.driver.data).toEqual(driver);
        expect(mockRequestOptions.formData.driver.contentType).toEqual(driverContentType);
        expect(mockRequestOptions.formData.driver_file_name).toEqual(driverFileName);
        expect(mockRequestOptions.formData.certificate).toEqual(certificate);
        expect(mockRequestOptions.formData.certificate_extension).toEqual(certificateExtension);
        expect(mockRequestOptions.formData.ssl).toEqual(ssl);
        expect(mockRequestOptions.formData.username).toEqual(username);
        expect(mockRequestOptions.formData.password).toEqual(password);
        expect(mockRequestOptions.formData.database_name).toEqual(databaseName);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.created_on).toEqual(createdOn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDriverDatabaseCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createDriverDatabaseCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createDriverDatabaseCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseDisplayName = 'testString';
        const databaseType = 'testString';
        const catalogName = 'testString';
        const hostname = 'testString';
        const port = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDriverDatabaseCatalogParams = {
          databaseDisplayName,
          databaseType,
          catalogName,
          hostname,
          port,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createDriverDatabaseCatalog(createDriverDatabaseCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createDriverDatabaseCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createDriverDatabaseCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDatabaseRegistrations', () => {
    describe('positive tests', () => {
      function __listDatabaseRegistrationsTest() {
        // Construct the params object for operation listDatabaseRegistrations
        const authInstanceId = 'testString';
        const listDatabaseRegistrationsParams = {
          authInstanceId,
        };

        const listDatabaseRegistrationsResult = watsonxDataService.listDatabaseRegistrations(listDatabaseRegistrationsParams);

        // all methods should return a Promise
        expectToBePromise(listDatabaseRegistrationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDatabaseRegistrationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listDatabaseRegistrationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listDatabaseRegistrationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDatabaseRegistrationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listDatabaseRegistrations(listDatabaseRegistrationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listDatabaseRegistrations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDatabaseRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RegisterDatabaseCatalogBodyDatabaseDetails
      const registerDatabaseCatalogBodyDatabaseDetailsModel = {
        certificate: 'contents of a pem/crt file',
        certificate_extension: 'pem/crt',
        database_name: 'new_database',
        hostname: 'db2@<hostname>.com',
        hosts: 'abc.com:1234,xyz.com:4321',
        password: 'samplepassword',
        port: 4553,
        sasl: true,
        ssl: true,
        tables: 'kafka_table_name',
        username: 'sampleuser',
      };

      // RegisterDatabaseCatalogBodyDatabasePropertiesItems
      const registerDatabaseCatalogBodyDatabasePropertiesItemsModel = {
        encrypt: true,
        key: 'abc',
        value: 'xyz',
      };

      function __createDatabaseRegistrationTest() {
        // Construct the params object for operation createDatabaseRegistration
        const catalogName = 'sampleCatalog';
        const databaseDisplayName = 'new_database';
        const databaseType = 'db2';
        const createdOn = 38;
        const databaseDetails = registerDatabaseCatalogBodyDatabaseDetailsModel;
        const databaseProperties = [registerDatabaseCatalogBodyDatabasePropertiesItemsModel];
        const description = 'db2 extenal database description';
        const tags = ['tag_1', 'tag_2'];
        const authInstanceId = 'testString';
        const createDatabaseRegistrationParams = {
          catalogName,
          databaseDisplayName,
          databaseType,
          createdOn,
          databaseDetails,
          databaseProperties,
          description,
          tags,
          authInstanceId,
        };

        const createDatabaseRegistrationResult = watsonxDataService.createDatabaseRegistration(createDatabaseRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(createDatabaseRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.database_display_name).toEqual(databaseDisplayName);
        expect(mockRequestOptions.body.database_type).toEqual(databaseType);
        expect(mockRequestOptions.body.created_on).toEqual(createdOn);
        expect(mockRequestOptions.body.database_details).toEqual(databaseDetails);
        expect(mockRequestOptions.body.database_properties).toEqual(databaseProperties);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDatabaseRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createDatabaseRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createDatabaseRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogName = 'sampleCatalog';
        const databaseDisplayName = 'new_database';
        const databaseType = 'db2';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDatabaseRegistrationParams = {
          catalogName,
          databaseDisplayName,
          databaseType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createDatabaseRegistration(createDatabaseRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createDatabaseRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createDatabaseRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDatabase', () => {
    describe('positive tests', () => {
      function __getDatabaseTest() {
        // Construct the params object for operation getDatabase
        const databaseId = 'testString';
        const authInstanceId = 'testString';
        const getDatabaseParams = {
          databaseId,
          authInstanceId,
        };

        const getDatabaseResult = watsonxDataService.getDatabase(getDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(getDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDatabaseParams = {
          databaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getDatabase(getDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDatabaseCatalog', () => {
    describe('positive tests', () => {
      function __deleteDatabaseCatalogTest() {
        // Construct the params object for operation deleteDatabaseCatalog
        const databaseId = 'testString';
        const authInstanceId = 'testString';
        const deleteDatabaseCatalogParams = {
          databaseId,
          authInstanceId,
        };

        const deleteDatabaseCatalogResult = watsonxDataService.deleteDatabaseCatalog(deleteDatabaseCatalogParams);

        // all methods should return a Promise
        expectToBePromise(deleteDatabaseCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDatabaseCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDatabaseCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDatabaseCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDatabaseCatalogParams = {
          databaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDatabaseCatalog(deleteDatabaseCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDatabaseCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDatabaseCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDatabase', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDatabaseTest() {
        // Construct the params object for operation updateDatabase
        const databaseId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateDatabaseParams = {
          databaseId,
          body,
          authInstanceId,
        };

        const updateDatabaseResult = watsonxDataService.updateDatabase(updateDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(updateDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDatabaseParams = {
          databaseId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateDatabase(updateDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('validateDatabaseConnection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ValidateDatabaseBodyDatabaseDetails
      const validateDatabaseBodyDatabaseDetailsModel = {
        database_name: 'sampledatabase',
        hostname: 'db2@hostname.com',
        password: 'samplepassword',
        port: 4553,
        sasl: true,
        ssl: true,
        tables: 'kafka_table_name',
        username: 'sampleuser',
      };

      function __validateDatabaseConnectionTest() {
        // Construct the params object for operation validateDatabaseConnection
        const databaseDetails = validateDatabaseBodyDatabaseDetailsModel;
        const databaseType = 'netezza';
        const certificate = 'contents of a pem/crt file';
        const authInstanceId = 'testString';
        const validateDatabaseConnectionParams = {
          databaseDetails,
          databaseType,
          certificate,
          authInstanceId,
        };

        const validateDatabaseConnectionResult = watsonxDataService.validateDatabaseConnection(validateDatabaseConnectionParams);

        // all methods should return a Promise
        expectToBePromise(validateDatabaseConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/test_database_connection', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.database_details).toEqual(databaseDetails);
        expect(mockRequestOptions.body.database_type).toEqual(databaseType);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __validateDatabaseConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __validateDatabaseConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __validateDatabaseConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseDetails = validateDatabaseBodyDatabaseDetailsModel;
        const databaseType = 'netezza';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const validateDatabaseConnectionParams = {
          databaseDetails,
          databaseType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.validateDatabaseConnection(validateDatabaseConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.validateDatabaseConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.validateDatabaseConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDb2Engines', () => {
    describe('positive tests', () => {
      function __listDb2EnginesTest() {
        // Construct the params object for operation listDb2Engines
        const authInstanceId = 'testString';
        const listDb2EnginesParams = {
          authInstanceId,
        };

        const listDb2EnginesResult = watsonxDataService.listDb2Engines(listDb2EnginesParams);

        // all methods should return a Promise
        expectToBePromise(listDb2EnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDb2EnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listDb2EnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listDb2EnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDb2EnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listDb2Engines(listDb2EnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listDb2Engines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDb2Engine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateDb2EngineDetails
      const createDb2EngineDetailsModel = {
        connection_string: '1.2.3.4',
      };

      function __createDb2EngineTest() {
        // Construct the params object for operation createDb2Engine
        const origin = 'external';
        const type = 'db2';
        const description = 'db2 engine description';
        const engineDetails = createDb2EngineDetailsModel;
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createDb2EngineParams = {
          origin,
          type,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createDb2EngineResult = watsonxDataService.createDb2Engine(createDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(createDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'external';
        const type = 'db2';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDb2EngineParams = {
          origin,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createDb2Engine(createDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDb2Engine', () => {
    describe('positive tests', () => {
      function __deleteDb2EngineTest() {
        // Construct the params object for operation deleteDb2Engine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteDb2EngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteDb2EngineResult = watsonxDataService.deleteDb2Engine(deleteDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDb2EngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDb2Engine(deleteDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDb2Engine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateDb2EngineTest() {
        // Construct the params object for operation updateDb2Engine
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateDb2EngineParams = {
          engineId,
          body,
          authInstanceId,
        };

        const updateDb2EngineResult = watsonxDataService.updateDb2Engine(updateDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(updateDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDb2EngineParams = {
          engineId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateDb2Engine(updateDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEngines', () => {
    describe('positive tests', () => {
      function __listEnginesTest() {
        // Construct the params object for operation listEngines
        const authInstanceId = 'testString';
        const listEnginesParams = {
          authInstanceId,
        };

        const listEnginesResult = watsonxDataService.listEngines(listEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listEngines(listEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getDeployments', () => {
    describe('positive tests', () => {
      function __getDeploymentsTest() {
        // Construct the params object for operation getDeployments
        const authInstanceId = 'testString';
        const getDeploymentsParams = {
          authInstanceId,
        };

        const getDeploymentsResult = watsonxDataService.getDeployments(getDeploymentsParams);

        // all methods should return a Promise
        expectToBePromise(getDeploymentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instance', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDeploymentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getDeploymentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getDeploymentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDeploymentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getDeployments(getDeploymentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.getDeployments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listNetezzaEngines', () => {
    describe('positive tests', () => {
      function __listNetezzaEnginesTest() {
        // Construct the params object for operation listNetezzaEngines
        const authInstanceId = 'testString';
        const listNetezzaEnginesParams = {
          authInstanceId,
        };

        const listNetezzaEnginesResult = watsonxDataService.listNetezzaEngines(listNetezzaEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listNetezzaEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNetezzaEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listNetezzaEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listNetezzaEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNetezzaEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listNetezzaEngines(listNetezzaEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listNetezzaEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createNetezzaEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateNetezzaEngineDetails
      const createNetezzaEngineDetailsModel = {
        connection_string: '1.2.3.4',
      };

      function __createNetezzaEngineTest() {
        // Construct the params object for operation createNetezzaEngine
        const origin = 'external';
        const type = 'netezza';
        const description = 'netezza engine description';
        const engineDetails = createNetezzaEngineDetailsModel;
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createNetezzaEngineParams = {
          origin,
          type,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createNetezzaEngineResult = watsonxDataService.createNetezzaEngine(createNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(createNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'external';
        const type = 'netezza';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createNetezzaEngineParams = {
          origin,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createNetezzaEngine(createNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteNetezzaEngine', () => {
    describe('positive tests', () => {
      function __deleteNetezzaEngineTest() {
        // Construct the params object for operation deleteNetezzaEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteNetezzaEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteNetezzaEngineResult = watsonxDataService.deleteNetezzaEngine(deleteNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNetezzaEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteNetezzaEngine(deleteNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateNetezzaEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateNetezzaEngineTest() {
        // Construct the params object for operation updateNetezzaEngine
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateNetezzaEngineParams = {
          engineId,
          body,
          authInstanceId,
        };

        const updateNetezzaEngineResult = watsonxDataService.updateNetezzaEngine(updateNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(updateNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateNetezzaEngineParams = {
          engineId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateNetezzaEngine(updateNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listOtherEngines', () => {
    describe('positive tests', () => {
      function __listOtherEnginesTest() {
        // Construct the params object for operation listOtherEngines
        const authInstanceId = 'testString';
        const listOtherEnginesParams = {
          authInstanceId,
        };

        const listOtherEnginesResult = watsonxDataService.listOtherEngines(listOtherEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listOtherEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOtherEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listOtherEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listOtherEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOtherEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listOtherEngines(listOtherEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listOtherEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createOtherEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OtherEngineDetails
      const otherEngineDetailsModel = {
        connection_string: '1.2.3.4',
        engine_type: 'netezza',
        metastore_host: '1.2.3.4',
      };

      function __createOtherEngineTest() {
        // Construct the params object for operation createOtherEngine
        const description = 'external engine description';
        const engineDetails = otherEngineDetailsModel;
        const engineDisplayName = 'sampleEngine01';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createOtherEngineParams = {
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createOtherEngineResult = watsonxDataService.createOtherEngine(createOtherEngineParams);

        // all methods should return a Promise
        expectToBePromise(createOtherEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOtherEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createOtherEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createOtherEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createOtherEngineParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createOtherEngine(createOtherEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.createOtherEngine({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteOtherEngine', () => {
    describe('positive tests', () => {
      function __deleteOtherEngineTest() {
        // Construct the params object for operation deleteOtherEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteOtherEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteOtherEngineResult = watsonxDataService.deleteOtherEngine(deleteOtherEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteOtherEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOtherEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteOtherEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteOtherEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteOtherEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteOtherEngine(deleteOtherEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteOtherEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteOtherEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestoEngines', () => {
    describe('positive tests', () => {
      function __listPrestoEnginesTest() {
        // Construct the params object for operation listPrestoEngines
        const authInstanceId = 'testString';
        const listPrestoEnginesParams = {
          authInstanceId,
        };

        const listPrestoEnginesResult = watsonxDataService.listPrestoEngines(listPrestoEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listPrestoEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestoEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestoEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestoEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestoEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestoEngines(listPrestoEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listPrestoEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NodeDescriptionBody
      const nodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // EngineDetailsBody
      const engineDetailsBodyModel = {
        api_key: '<api_key>',
        connection_string: '1.2.3.4',
        coordinator: nodeDescriptionBodyModel,
        instance_id: 'instance_id',
        managed_by: 'fully/self',
        size_config: 'starter',
        worker: nodeDescriptionBodyModel,
      };

      function __createEngineTest() {
        // Construct the params object for operation createEngine
        const origin = 'native';
        const type = 'presto';
        const associatedCatalogs = ['iceberg_data', 'hive_data'];
        const description = 'presto engine description';
        const engineDetails = engineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine';
        const firstTimeUse = true;
        const region = 'us-south';
        const tags = ['tag1', 'tag2'];
        const version = '1.2.3';
        const authInstanceId = 'testString';
        const createEngineParams = {
          origin,
          type,
          associatedCatalogs,
          description,
          engineDetails,
          engineDisplayName,
          firstTimeUse,
          region,
          tags,
          version,
          authInstanceId,
        };

        const createEngineResult = watsonxDataService.createEngine(createEngineParams);

        // all methods should return a Promise
        expectToBePromise(createEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.associated_catalogs).toEqual(associatedCatalogs);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.first_time_use).toEqual(firstTimeUse);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const type = 'presto';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEngineParams = {
          origin,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createEngine(createEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestoEngine', () => {
    describe('positive tests', () => {
      function __getPrestoEngineTest() {
        // Construct the params object for operation getPrestoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getPrestoEngineParams = {
          engineId,
          authInstanceId,
        };

        const getPrestoEngineResult = watsonxDataService.getPrestoEngine(getPrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(getPrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestoEngine(getPrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEngine', () => {
    describe('positive tests', () => {
      function __deleteEngineTest() {
        // Construct the params object for operation deleteEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteEngineResult = watsonxDataService.deleteEngine(deleteEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteEngine(deleteEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateEngineTest() {
        // Construct the params object for operation updateEngine
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateEngineParams = {
          engineId,
          body,
          authInstanceId,
        };

        const updateEngineResult = watsonxDataService.updateEngine(updateEngineParams);

        // all methods should return a Promise
        expectToBePromise(updateEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEngineParams = {
          engineId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateEngine(updateEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __listPrestoEngineCatalogsTest() {
        // Construct the params object for operation listPrestoEngineCatalogs
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listPrestoEngineCatalogsParams = {
          engineId,
          authInstanceId,
        };

        const listPrestoEngineCatalogsResult = watsonxDataService.listPrestoEngineCatalogs(listPrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listPrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestoEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestoEngineCatalogs(listPrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listPrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listPrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replacePrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __replacePrestoEngineCatalogsTest() {
        // Construct the params object for operation replacePrestoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const replacePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const replacePrestoEngineCatalogsResult = watsonxDataService.replacePrestoEngineCatalogs(replacePrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(replacePrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replacePrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __replacePrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __replacePrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogNames = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replacePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.replacePrestoEngineCatalogs(replacePrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.replacePrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.replacePrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __deletePrestoEngineCatalogsTest() {
        // Construct the params object for operation deletePrestoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const deletePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const deletePrestoEngineCatalogsResult = watsonxDataService.deletePrestoEngineCatalogs(deletePrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(deletePrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deletePrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deletePrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogNames = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deletePrestoEngineCatalogs(deletePrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestoEngineCatalog', () => {
    describe('positive tests', () => {
      function __getPrestoEngineCatalogTest() {
        // Construct the params object for operation getPrestoEngineCatalog
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getPrestoEngineCatalogParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const getPrestoEngineCatalogResult = watsonxDataService.getPrestoEngineCatalog(getPrestoEngineCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getPrestoEngineCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestoEngineCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestoEngineCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestoEngineCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestoEngineCatalogParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestoEngineCatalog(getPrestoEngineCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngineCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngineCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEnginePause', () => {
    describe('positive tests', () => {
      function __createEnginePauseTest() {
        // Construct the params object for operation createEnginePause
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const createEnginePauseParams = {
          engineId,
          authInstanceId,
        };

        const createEnginePauseResult = watsonxDataService.createEnginePause(createEnginePauseParams);

        // all methods should return a Promise
        expectToBePromise(createEnginePauseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/pause', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEnginePauseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createEnginePauseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createEnginePauseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEnginePauseParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createEnginePause(createEnginePauseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createEnginePause({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createEnginePause();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runExplainStatement', () => {
    describe('positive tests', () => {
      function __runExplainStatementTest() {
        // Construct the params object for operation runExplainStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const format = 'json';
        const type = 'io';
        const authInstanceId = 'testString';
        const runExplainStatementParams = {
          engineId,
          statement,
          format,
          type,
          authInstanceId,
        };

        const runExplainStatementResult = watsonxDataService.runExplainStatement(runExplainStatementParams);

        // all methods should return a Promise
        expectToBePromise(runExplainStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/query_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runExplainStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runExplainStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runExplainStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runExplainStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runExplainStatement(runExplainStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runExplainStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runExplainStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runExplainAnalyzeStatement', () => {
    describe('positive tests', () => {
      function __runExplainAnalyzeStatementTest() {
        // Construct the params object for operation runExplainAnalyzeStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const verbose = true;
        const authInstanceId = 'testString';
        const runExplainAnalyzeStatementParams = {
          engineId,
          statement,
          verbose,
          authInstanceId,
        };

        const runExplainAnalyzeStatementResult = watsonxDataService.runExplainAnalyzeStatement(runExplainAnalyzeStatementParams);

        // all methods should return a Promise
        expectToBePromise(runExplainAnalyzeStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/query_explain_analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runExplainAnalyzeStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runExplainAnalyzeStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runExplainAnalyzeStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runExplainAnalyzeStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runExplainAnalyzeStatement(runExplainAnalyzeStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runExplainAnalyzeStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runExplainAnalyzeStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEngineRestart', () => {
    describe('positive tests', () => {
      function __createEngineRestartTest() {
        // Construct the params object for operation createEngineRestart
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const createEngineRestartParams = {
          engineId,
          authInstanceId,
        };

        const createEngineRestartResult = watsonxDataService.createEngineRestart(createEngineRestartParams);

        // all methods should return a Promise
        expectToBePromise(createEngineRestartResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/restart', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEngineRestartTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createEngineRestartTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createEngineRestartTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEngineRestartParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createEngineRestart(createEngineRestartParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createEngineRestart({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createEngineRestart();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEngineResume', () => {
    describe('positive tests', () => {
      function __createEngineResumeTest() {
        // Construct the params object for operation createEngineResume
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const createEngineResumeParams = {
          engineId,
          authInstanceId,
        };

        const createEngineResumeResult = watsonxDataService.createEngineResume(createEngineResumeParams);

        // all methods should return a Promise
        expectToBePromise(createEngineResumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/resume', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEngineResumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createEngineResumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createEngineResumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEngineResumeParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createEngineResume(createEngineResumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createEngineResume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createEngineResume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEngineScale', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NodeDescription
      const nodeDescriptionModel = {
        node_type: 'worker',
        quantity: 38,
      };

      function __createEngineScaleTest() {
        // Construct the params object for operation createEngineScale
        const engineId = 'testString';
        const coordinator = nodeDescriptionModel;
        const worker = nodeDescriptionModel;
        const authInstanceId = 'testString';
        const createEngineScaleParams = {
          engineId,
          coordinator,
          worker,
          authInstanceId,
        };

        const createEngineScaleResult = watsonxDataService.createEngineScale(createEngineScaleParams);

        // all methods should return a Promise
        expectToBePromise(createEngineScaleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/scale', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.coordinator).toEqual(coordinator);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEngineScaleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createEngineScaleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createEngineScaleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEngineScaleParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createEngineScale(createEngineScaleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createEngineScale({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createEngineScale();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkEngines', () => {
    describe('positive tests', () => {
      function __listSparkEnginesTest() {
        // Construct the params object for operation listSparkEngines
        const authInstanceId = 'testString';
        const listSparkEnginesParams = {
          authInstanceId,
        };

        const listSparkEnginesResult = watsonxDataService.listSparkEngines(listSparkEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listSparkEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkEngines(listSparkEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listSparkEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createSparkEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SparkEngineDetailsPrototype
      const sparkEngineDetailsPrototypeModel = {
        api_key: 'apikey',
        connection_string: '1.2.3.4',
        instance_id: 'spark-id',
        managed_by: 'fully/self',
      };

      function __createSparkEngineTest() {
        // Construct the params object for operation createSparkEngine
        const origin = 'native';
        const type = 'spark';
        const description = 'spark engine description';
        const engineDetails = sparkEngineDetailsPrototypeModel;
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createSparkEngineParams = {
          origin,
          type,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createSparkEngineResult = watsonxDataService.createSparkEngine(createSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const type = 'spark';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineParams = {
          origin,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngine(createSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngine', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineTest() {
        // Construct the params object for operation deleteSparkEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteSparkEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteSparkEngineResult = watsonxDataService.deleteSparkEngine(deleteSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngine(deleteSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSparkEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateSparkEngineTest() {
        // Construct the params object for operation updateSparkEngine
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateSparkEngineParams = {
          engineId,
          body,
          authInstanceId,
        };

        const updateSparkEngineResult = watsonxDataService.updateSparkEngine(updateSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(updateSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSparkEngineParams = {
          engineId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateSparkEngine(updateSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkEngineApplications', () => {
    describe('positive tests', () => {
      function __listSparkEngineApplicationsTest() {
        // Construct the params object for operation listSparkEngineApplications
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listSparkEngineApplicationsParams = {
          engineId,
          authInstanceId,
        };

        const listSparkEngineApplicationsResult = watsonxDataService.listSparkEngineApplications(listSparkEngineApplicationsParams);

        // all methods should return a Promise
        expectToBePromise(listSparkEngineApplicationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkEngineApplicationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkEngineApplicationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkEngineApplicationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkEngineApplicationsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkEngineApplications(listSparkEngineApplicationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineApplications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineApplications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSparkEngineApplication', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SparkApplicationDetails
      const sparkApplicationDetailsModel = {
        application: 's3://mybucket/wordcount.py',
        arguments: ['people.txt'],
        conf: { 'key1': 'key:value' },
        env: { 'key1': 'key:value' },
        name: 'SparkApplicaton1',
      };

      function __createSparkEngineApplicationTest() {
        // Construct the params object for operation createSparkEngineApplication
        const engineId = 'testString';
        const applicationDetails = sparkApplicationDetailsModel;
        const jobEndpoint = '<host>/v4/analytics_engines/c7b3fccf-badb-46b0-b1ef-9b3154424021/engine_applications';
        const serviceInstanceId = 'testString';
        const type = 'iae';
        const authInstanceId = 'testString';
        const createSparkEngineApplicationParams = {
          engineId,
          applicationDetails,
          jobEndpoint,
          serviceInstanceId,
          type,
          authInstanceId,
        };

        const createSparkEngineApplicationResult = watsonxDataService.createSparkEngineApplication(createSparkEngineApplicationParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.application_details).toEqual(applicationDetails);
        expect(mockRequestOptions.body.job_endpoint).toEqual(jobEndpoint);
        expect(mockRequestOptions.body.service_instance_id).toEqual(serviceInstanceId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationDetails = sparkApplicationDetailsModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineApplicationParams = {
          engineId,
          applicationDetails,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngineApplication(createSparkEngineApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngineApplications', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineApplicationsTest() {
        // Construct the params object for operation deleteSparkEngineApplications
        const engineId = 'testString';
        const applicationId = 'testString';
        const authInstanceId = 'testString';
        const deleteSparkEngineApplicationsParams = {
          engineId,
          applicationId,
          authInstanceId,
        };

        const deleteSparkEngineApplicationsResult = watsonxDataService.deleteSparkEngineApplications(deleteSparkEngineApplicationsParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineApplicationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.application_id).toEqual(applicationId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineApplicationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineApplicationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineApplicationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineApplicationsParams = {
          engineId,
          applicationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngineApplications(deleteSparkEngineApplicationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineApplications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineApplications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSparkEngineApplicationStatus', () => {
    describe('positive tests', () => {
      function __getSparkEngineApplicationStatusTest() {
        // Construct the params object for operation getSparkEngineApplicationStatus
        const engineId = 'testString';
        const applicationId = 'testString';
        const authInstanceId = 'testString';
        const getSparkEngineApplicationStatusParams = {
          engineId,
          applicationId,
          authInstanceId,
        };

        const getSparkEngineApplicationStatusResult = watsonxDataService.getSparkEngineApplicationStatus(getSparkEngineApplicationStatusParams);

        // all methods should return a Promise
        expectToBePromise(getSparkEngineApplicationStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications/{application_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.application_id).toEqual(applicationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSparkEngineApplicationStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getSparkEngineApplicationStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getSparkEngineApplicationStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSparkEngineApplicationStatusParams = {
          engineId,
          applicationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getSparkEngineApplicationStatus(getSparkEngineApplicationStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineApplicationStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineApplicationStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('testLhConsole', () => {
    describe('positive tests', () => {
      function __testLhConsoleTest() {
        // Construct the params object for operation testLhConsole
        const testLhConsoleParams = {};

        const testLhConsoleResult = watsonxDataService.testLhConsole(testLhConsoleParams);

        // all methods should return a Promise
        expectToBePromise(testLhConsoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ready', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __testLhConsoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __testLhConsoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __testLhConsoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const testLhConsoleParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.testLhConsole(testLhConsoleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.testLhConsole({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listCatalogs', () => {
    describe('positive tests', () => {
      function __listCatalogsTest() {
        // Construct the params object for operation listCatalogs
        const authInstanceId = 'testString';
        const listCatalogsParams = {
          authInstanceId,
        };

        const listCatalogsResult = watsonxDataService.listCatalogs(listCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCatalogsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listCatalogs(listCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listCatalogs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCatalog', () => {
    describe('positive tests', () => {
      function __getCatalogTest() {
        // Construct the params object for operation getCatalog
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getCatalogParams = {
          catalogId,
          authInstanceId,
        };

        const getCatalogResult = watsonxDataService.getCatalog(getCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogParams = {
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getCatalog(getCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSchemas', () => {
    describe('positive tests', () => {
      function __listSchemasTest() {
        // Construct the params object for operation listSchemas
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const listSchemasParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const listSchemasResult = watsonxDataService.listSchemas(listSchemasParams);

        // all methods should return a Promise
        expectToBePromise(listSchemasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSchemasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSchemasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSchemasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSchemasParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSchemas(listSchemasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listSchemas({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listSchemas();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSchema', () => {
    describe('positive tests', () => {
      function __createSchemaTest() {
        // Construct the params object for operation createSchema
        const engineId = 'testString';
        const catalogId = 'testString';
        const customPath = 'sample-path';
        const schemaName = 'SampleSchema1';
        const bucketName = 'sample-bucket';
        const authInstanceId = 'testString';
        const createSchemaParams = {
          engineId,
          catalogId,
          customPath,
          schemaName,
          bucketName,
          authInstanceId,
        };

        const createSchemaResult = watsonxDataService.createSchema(createSchemaParams);

        // all methods should return a Promise
        expectToBePromise(createSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.custom_path).toEqual(customPath);
        expect(mockRequestOptions.body.schema_name).toEqual(schemaName);
        expect(mockRequestOptions.body.bucket_name).toEqual(bucketName);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const customPath = 'sample-path';
        const schemaName = 'SampleSchema1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSchemaParams = {
          engineId,
          catalogId,
          customPath,
          schemaName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSchema(createSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSchema', () => {
    describe('positive tests', () => {
      function __deleteSchemaTest() {
        // Construct the params object for operation deleteSchema
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const authInstanceId = 'testString';
        const deleteSchemaParams = {
          engineId,
          catalogId,
          schemaId,
          authInstanceId,
        };

        const deleteSchemaResult = watsonxDataService.deleteSchema(deleteSchemaParams);

        // all methods should return a Promise
        expectToBePromise(deleteSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSchemaParams = {
          engineId,
          catalogId,
          schemaId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSchema(deleteSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTables', () => {
    describe('positive tests', () => {
      function __listTablesTest() {
        // Construct the params object for operation listTables
        const catalogId = 'testString';
        const schemaId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listTablesParams = {
          catalogId,
          schemaId,
          engineId,
          authInstanceId,
        };

        const listTablesResult = watsonxDataService.listTables(listTablesParams);

        // all methods should return a Promise
        expectToBePromise(listTablesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTablesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listTablesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listTablesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTablesParams = {
          catalogId,
          schemaId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listTables(listTablesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listTables();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTable', () => {
    describe('positive tests', () => {
      function __getTableTest() {
        // Construct the params object for operation getTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          authInstanceId,
        };

        const getTableResult = watsonxDataService.getTable(getTableParams);

        // all methods should return a Promise
        expectToBePromise(getTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getTable(getTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTable', () => {
    describe('positive tests', () => {
      function __deleteTableTest() {
        // Construct the params object for operation deleteTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          authInstanceId,
        };

        const deleteTableResult = watsonxDataService.deleteTable(deleteTableParams);

        // all methods should return a Promise
        expectToBePromise(deleteTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteTable(deleteTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTable', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateTableTest() {
        // Construct the params object for operation updateTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          body,
          authInstanceId,
        };

        const updateTableResult = watsonxDataService.updateTable(updateTableParams);

        // all methods should return a Promise
        expectToBePromise(updateTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateTable(updateTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTableSnapshots', () => {
    describe('positive tests', () => {
      function __listTableSnapshotsTest() {
        // Construct the params object for operation listTableSnapshots
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const authInstanceId = 'testString';
        const listTableSnapshotsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          authInstanceId,
        };

        const listTableSnapshotsResult = watsonxDataService.listTableSnapshots(listTableSnapshotsParams);

        // all methods should return a Promise
        expectToBePromise(listTableSnapshotsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/snapshots', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTableSnapshotsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listTableSnapshotsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listTableSnapshotsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTableSnapshotsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listTableSnapshots(listTableSnapshotsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listTableSnapshots({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listTableSnapshots();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceSnapshot', () => {
    describe('positive tests', () => {
      function __replaceSnapshotTest() {
        // Construct the params object for operation replaceSnapshot
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const snapshotId = 'testString';
        const authInstanceId = 'testString';
        const replaceSnapshotParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          snapshotId,
          authInstanceId,
        };

        const replaceSnapshotResult = watsonxDataService.replaceSnapshot(replaceSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(replaceSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/snapshots/{snapshot_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
        expect(mockRequestOptions.path.snapshot_id).toEqual(snapshotId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __replaceSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __replaceSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const snapshotId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceSnapshotParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          snapshotId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.replaceSnapshot(replaceSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.replaceSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.replaceSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSyncCatalog', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateSyncCatalogTest() {
        // Construct the params object for operation updateSyncCatalog
        const catalogId = 'testString';
        const body = [jsonPatchOperationModel];
        const authInstanceId = 'testString';
        const updateSyncCatalogParams = {
          catalogId,
          body,
          authInstanceId,
        };

        const updateSyncCatalogResult = watsonxDataService.updateSyncCatalog(updateSyncCatalogParams);

        // all methods should return a Promise
        expectToBePromise(updateSyncCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/sync', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSyncCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateSyncCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateSyncCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const body = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSyncCatalogParams = {
          catalogId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateSyncCatalog(updateSyncCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateSyncCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateSyncCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
