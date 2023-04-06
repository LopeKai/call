import { Box, styled } from "@ignite-ui/react";

export const ConnectBox = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column'
})

export const ConnectItem = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    border: '1px solid $gray',
    padding: '$4 $6',
    borderRadius: '$md'
})