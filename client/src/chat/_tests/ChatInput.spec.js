import { render, cleanup, fireEvent, createEvent } from '@testing-library/svelte';

import ChatInput from '../ChatInput.svelte';
import store from '../store';

jest.mock('../store');
const mockStartedTyping = store.sendStartedTyping;
const mockStoppedTyping = store.sendStoppedTyping;

beforeEach(() => {
    cleanup();
    mockStartedTyping.mockReset();
    mockStoppedTyping.mockReset();
});

test('shows send button when rendered', () => {
    const { getByRole } = render(ChatInput);

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button', { type: 'submit' })).toBeInTheDocument();
})

test('should send typing events', () => {
    const { getByRole } = render(ChatInput);

    const input = getByRole('textbox');
    fireEvent(
        input,
        createEvent('input', input, {
            target: { value: 'A' }
        })
    )
    fireEvent(
        input,
        createEvent('input', input, {
            target: { value: '' }
        })
    )
    expect(mockStartedTyping).toHaveBeenCalledTimes(1);
    expect(mockStoppedTyping).toHaveBeenCalledTimes(1);
})