// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Heading } from '~/ui/Heading';
import { LoadingSpinner } from '~/ui/LoadingSpinner';
import { PaginationFirst24, PaginationPrev24, PaginationNext24 } from '@mysten/icons';
import { Button } from '~/ui/Button';

export const ITEMS_PER_PAGE: number = 6;

type PaginatedContainerPropTypes = {
    heading: string
    currentPage: number
    totalItems: number
    paginatedContent: JSX.Element
    isLoaded?: boolean
    isFail: boolean
    itemsPerPage: number
    setCurrentPage: (page: number) => void
}

const PaginatedContainer = ({ heading,
    paginatedContent,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    currentPage,
    isFail = false,
    isLoaded = true
}: PaginatedContainerPropTypes) => {
    if (!isLoaded) {
        return <div className="p-[8px]"><LoadingSpinner /></div>
    }

    if (isFail) {
        return <div className="pt-2 font-sans font-semibold text-issue-dark">Failed to load {heading}.</div>;
    }

    return <div className="flex flex-col text-left space-y-5 pt-5 xl:pr-10">
        <Heading color="gray-90" variant="heading4/semibold">
            {heading}
        </Heading>
        <div className="flex max-h-80 flex-col overflow-auto">
            {paginatedContent}
        </div>
        <div className="border-t-[1px] mr-[40px] border-gray-45 border-solid pt-[8px]"></div>
        {totalItems > itemsPerPage ? <div className="[&>button]:mr-[8px] pt-[8px] !mt-0">
            <Button variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}>
                <PaginationFirst24 />
            </Button>
            <Button variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                <PaginationPrev24 />
            </Button>
            <Button variant="outline"
                disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}>
                <PaginationNext24 />
            </Button>
        </div> : null}
    </div>
}

export default PaginatedContainer;
