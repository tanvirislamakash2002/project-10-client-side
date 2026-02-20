const LoadingSkeleton = () => (
    <div className="min-h-screen bg-base-200 dark:bg-base-100">
        <div className="bg-base-100 dark:bg-base-200 border-b border-section-border dark:border-section-border">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="skeleton h-12 w-3/4 mx-auto"></div>
                    <div className="skeleton h-6 w-1/2 mx-auto"></div>
                    <div className="skeleton h-12 w-full max-w-2xl mx-auto"></div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <div className="skeleton h-64 w-full"></div>
                    <div className="skeleton h-48 w-full"></div>
                </div>
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="card bg-base-100 dark:bg-base-200 shadow-lg">
                                <div className="skeleton h-48 w-full"></div>
                                <div className="card-body space-y-2">
                                    <div className="skeleton h-4 w-1/2"></div>
                                    <div className="skeleton h-6 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default LoadingSkeleton;