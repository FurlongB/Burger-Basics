import reducer from './Auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () =>{
    it('should render the initial state if undefined passed', () =>{
        expect(reducer(undefined, {})).toEqual({
            token:null,
            userID: null,
            error: null,
            loading: false,
            authRedirectPath : '/'
        })
    });

    it('should store token and id when logged in', () =>{
        expect(reducer({
            token:null,
            userID: null,
            error: null,
            loading: false,
            authRedirectPath : '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-user-token',
            userID: 'some-user-id'
        })).toEqual({
            token:'some-user-token',
            userID: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath : '/'
        });
    });

    it('should return an error if log in fails', () =>{
        expect(reducer({
            token:null,
            userID: null,
            error: null,
            loading: false,
            authRedirectPath : '/'
        },{
            type: actionTypes.AUTH_FAILED,
            error: 'some error has occured in logging in',
            loading: false
        })).toEqual({
            token:null,
            userID:null,
            error: 'some error has occured in logging in',
            loading: false,
            authRedirectPath : '/'
        });
    });
});