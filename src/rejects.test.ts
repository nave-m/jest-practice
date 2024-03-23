describe('rejects', () => {
    const createPromise = async (argOfRejet: unknown): Promise<void> => {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(argOfRejet);
            }, 10);
        });
    }; 
    it('Promiseがrejectされたかを検証する', async () => {
        // rejectに渡されたものはtoEqualでマッチさせる
        await expect(createPromise(null)).rejects.toEqual(null);
        // rejectに渡されたものがErrorもしくはErrorを継承したインスタンスの場合、toThrowでマッチする
        await expect(createPromise(new Error('some error'))).rejects.toThrow(new Error('some error'));
    });
});