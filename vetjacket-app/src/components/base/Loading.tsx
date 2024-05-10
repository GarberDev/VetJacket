interface LoadingProps {
    loading?: boolean;
}

const Loading = ({loading}: LoadingProps) => {

    if (!loading) return null;

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-white/[.5] rounded-md dark:bg-gray-800/[.4]"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                    role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading;
