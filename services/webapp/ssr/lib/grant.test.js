
const assert = require('assert')
const grant = require('./grant')

describe('lib/grant', () => {
    describe('basic deny', () => {
        it('should deny if null grants were given', () => {
            const result = grant(null, '*')
            assert.equal(result, false)
        })
        it('should deny if no grants were given', () => {
            const result = grant([], '*')
            assert.equal(result, false)
        })
    })
    describe('superuser', () => {
        it('should grant superuser', () => {
            const result = grant('*', 'els:*')
            assert.equal(result, true)
        })
        it('should grant superuser as array', () => {
            const result = grant([ '*', 'foo' ], 'els:*')
            assert.equal(result, true)
        })
    })
    describe('fine grained permissions', () => {
        it('should grant by string', () => {
            const result = grant('foo', 'foo')
            assert.equal(result, true)
        })
        it('should grant by array', () => {
            const result = grant(['foo'], ['foo'])
            assert.equal(result, true)
        })
        it('should grant with multiple values', () => {
            const result = grant([ 'a', 'b' ], [ 'a', 'b' ])
            assert.equal(result, true)
        })
        it('should grant when overqualified', () => {
            const result = grant([ 'a', 'b', 'c' ], [ 'a', 'b' ])
            assert.equal(result, true)
        })
        it('should deny when underqualified', () => {
            const result = grant([ 'a', 'b' ], [ 'a', 'b', 'c' ])
            assert.equal(result, false)
        })
    })
    describe('wildchar permissions', () => {
        it('should grant by string', () => {
            const result = grant('foo:*', 'foo:write')
            assert.equal(result, true)
        })
        it('should grant by array', () => {
            const result = grant(['foo:*'], ['foo:write'])
            assert.equal(result, true)
        })
        it('should grant with multiple values', () => {
            const result = grant([ 'a:*', 'b:*' ], [ 'a:read', 'b:write' ])
            assert.equal(result, true)
        })
        it('should grant when overqualified', () => {
            const result = grant([ 'a:*', 'b:*', 'c:*' ], [ 'a:write', 'b:read' ])
            assert.equal(result, true)
        })
        it('should deny when underqualified', () => {
            const result = grant([ 'a:*', 'b:*' ], [ 'a:write', 'b:read', 'c:read' ])
            assert.equal(result, false)
        })
    })
    describe('requrie wildchar', () => {
        it('should grant by string', () => {
            const result = grant('foo:*', 'foo:*')
            assert.equal(result, true)
        })
        it('should grant by array', () => {
            const result = grant(['foo:*'], ['foo:*'])
            assert.equal(result, true)
        })
        it('should grant with multiple values', () => {
            const result = grant([ 'a:*', 'b:*' ], [ 'a:*', 'b:*' ])
            assert.equal(result, true)
        })
        it('should grant when overqualified', () => {
            const result = grant([ 'a:*', 'b:*', 'c:*' ], [ 'a:*', 'b:*' ])
            assert.equal(result, true)
        })
        it('should deny when underqualified', () => {
            const result = grant([ 'a:*', 'b:*' ], [ 'a:*', 'b:*', 'c:*' ])
            assert.equal(result, false)
        })
        it('should deny when not wildchar', () => {
            const result = grant([ 'a:read', 'a:write' ], 'a:*')
            assert.equal(result, false)
        })
    })
    describe('accept any sub-grant', () => {
        it('should grant by string', () => {
            const result = grant('foo:read', 'foo:?')
            assert.equal(result, true)
        })
        it('should grant by array', () => {
            const result = grant(['foo:read'], ['foo:?'])
            assert.equal(result, true)
        })
        it('should grant with multiple values', () => {
            const result = grant([ 'a:read', 'b:read' ], [ 'a:?', 'b:?' ])
            assert.equal(result, true)
        })
        it('should grant when overqualified', () => {
            const result = grant([ 'a:read', 'b:read', 'c:read' ], [ 'a:?', 'b:?' ])
            assert.equal(result, true)
        })
        it('should deny when underqualified', () => {
            const result = grant([ 'a:read', 'b:read' ], [ 'a:?', 'b:?', 'c:?' ])
            assert.equal(result, false)
        })
        it('should deny when granted uses the any', () => {
            const result = grant(['a:?'], ['a:*'])
            assert.equal(result, false)
        })
        it('should grant wildchar', () => {
            const result = grant(['a:*'], ['a:?'])
            assert.equal(result, true)
        })
    })
})
