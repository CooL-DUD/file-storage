export function useStoreFilesLoading() {
    return useState('files_loading', () => false)
}