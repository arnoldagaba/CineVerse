import { useEffect } from "react";

export function useInfiniteScroll(
    callback: () => void,
    canLoadMore: boolean,
    isLoading: boolean
) {
    useEffect(() => {
        const sentinel = document.getElementById("infinite-sentinel");
        if(!sentinel || !canLoadMore || isLoading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) callback();
        }, { threshold: 1})

        observer.observe(sentinel);
        return () => observer.disconnect()
    }, [callback, canLoadMore, isLoading]);
}
