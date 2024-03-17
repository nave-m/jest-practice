describe('toThrow', () => {
    class OriginalError extends Error {
        constructor(message?: string) {
            super(message);
        }
    };
    it.each([
        ['デフォルトのErrorのインスタンス', new Error()],
        ['Errorを継承したインスタンス', new OriginalError()],
        ['文字列r', 'error'],
    ])('toThrowの引数に何も指定しない場合、どんなインスタンスでもthrowされたらアサーションが通る %s', (_, somethingToThrow) => {
        expect(() => {
            throw somethingToThrow;
        }).toThrow();
    });
    it('toThrowの引数にErrorインスタンスを指定した場合、messageプロパティの比較がされる', () => {
        expect(() => {
            throw new Error();
        }).toThrow(new Error());
        expect(() => {
            throw new Error('message');
        }).toThrow(new Error('message'));
        expect(() => {
            throw new Error('message');
        }).not.toThrow(new Error()); // メッセージが一致しないのでnot.toThrowでアサーションが通る
    });
    it('toThrowの引数に型/コンストラクタを指定した場合、型のチェックがされる', () => {
        expect(() => {
            throw new Error();
        }).toThrow(Error);
        expect(() => {
            throw new OriginalError();
        }).toThrow(OriginalError);
        expect(() => {
            throw new OriginalError
        }).toThrow(Error); // OriginalErrorはErrorを継承しているのでアサーションが通る
        expect(() => {
            throw new Error();
        }).not.toThrow(OriginalError); // 型が不一致なのでnot.toThrowでアサーションが通る
    });
    it('toThrowの引数に正規表現を指定した場合、文字列もしくはErrorインスタンスのmessageプロパティのマッチが行われる', () => {
        expect(() => {
            throw 'something to throw error';
        }).toThrow(/something/);
        expect(() => {
            throw new Error('something to throw error');
        }).toThrow(/something/);
        expect(() => {
            throw new Error('anything to throw error');
        }).not.toThrow(/something/); // 正規表現がマッチしないなのでnot.toThrowでアサーションが通る
    })
});