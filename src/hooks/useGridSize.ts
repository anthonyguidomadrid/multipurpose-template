export const useGridSize = (itemCount: number) => {
    const getSmSize = () => {
        if (itemCount === 1) return 12
        return 6
    }
    
    const getMdSize = () => {
        if (itemCount === 1) return 12
        if (itemCount === 2 || itemCount === 4) return 6
        if (itemCount === 3) return 4
        return 4
    }
    
    return { xs: 12, sm: getSmSize(), md: getMdSize() }
    }