import { ChevronLeft, ChevronRight, Eye, Home, Star } from 'lucide-react';
import React from 'react';

const PhotoGallery = ({props}) => {
    const { singleRoom, currentImageIndex, prevImage, nextImage, setCurrentImageIndex } = props
    console.log(singleRoom);
    return (
        <div className="card bg-base-100 shadow-lg overflow-hidden">
            <div className="relative h-[500px] bg-base-300">
                {singleRoom?.images?.[currentImageIndex] ? (
                    <img
                        src={singleRoom.images[currentImageIndex]}
                        alt={`Room image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Home className="w-24 h-24 text-base-content opacity-20" />
                    </div>
                )}

                {singleRoom?.images && singleRoom.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2 bg-base-100/90 hover:bg-base-100"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2 bg-base-100/90 hover:bg-base-100"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {singleRoom.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === currentImageIndex
                                        ? 'bg-base-100 w-8'
                                        : 'bg-base-100/50 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* View Count Badge */}
                <div className="absolute top-4 right-4 badge badge-lg bg-base-100/90 gap-2">
                    <Eye className="w-4 h-4" />
                    {singleRoom?.viewCount} views
                </div>

                {/* Featured Badge */}
                {singleRoom?.isFeatured && (
                    <div className="absolute top-4 left-4 badge badge-warning badge-lg gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                    </div>
                )}
            </div>

            {/* Thumbnail strip */}
            {singleRoom?.images && singleRoom.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-base-100">
                    {singleRoom.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${idx === currentImageIndex
                                ? 'border-primary'
                                : 'border-transparent hover:border-base-300'
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;