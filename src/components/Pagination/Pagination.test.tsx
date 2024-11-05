import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { beforeEach, describe, expect, it, vi } from 'vitest';

//* Mock data
const postsPerPage = 5;
const totalPosts = 15;
const paginate = vi.fn();
const currentPage = 2;

describe('Pagination Component', () => {
    beforeEach(() => {
        paginate.mockClear();
    });
    //* render element to test
    render(<Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} currentPage={currentPage} />);

    it('renders the correct number of page links', () => {
        const pageLinks = screen.getAllByRole('link');
        expect(pageLinks.length).toBe(Math.ceil(totalPosts / postsPerPage));
    });

    it('highlights the current page', () => {
        const pageLinks = screen.getAllByRole('listitem');
        const activePage = pageLinks.find((item) => item.textContent === currentPage.toString());
        expect(activePage).toHaveProperty('className', 'page-item active');
    });

    it('calls paginate function with the correct page number when a page link is clicked', async () => {
        const secondPageLink = screen.findByText('2');
        fireEvent.click(await secondPageLink);

        expect(paginate).toHaveBeenCalledWith(2);
    });
});
