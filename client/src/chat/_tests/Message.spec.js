import { render, cleanup } from '@testing-library/svelte';
import Message from '../Message.svelte';

beforeEach(cleanup);

test('shows Username at the first message when rendered', () => {
    const prevMessage = undefined;
    const message = { author: 'Ana', text: 'HI' };
    const { getByText } = render(Message, { message, prevMessage });

    expect(getByText('Ana')).toBeInTheDocument();
    expect(getByText('HI')).toBeInTheDocument();
})

test('do not shows Username for next messages from the same user when rendered', () => {
    const prevMessage = { author: 'Ana', text: 'Hi' };
    const message = { author: 'Ana', text: 'LOL' };
    const { queryByText, getByText } = render(Message, { message, prevMessage });

    expect(queryByText('Ana')).toBeNull();
    expect(getByText('LOL')).toBeInTheDocument();
})