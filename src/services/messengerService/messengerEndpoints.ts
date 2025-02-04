import { RootState } from '@/app/store/types/rootState'
import { api } from '@/services/api'
import { MESSENGER_WS_EVENT } from '@/services/messengerService/lib/constant'
import {
  GetDialogMessagesParams,
  GetDialogMessagesResponse,
  GetMessengerArrayOfLatestMsgParams,
  GetMessengerArrayOfLatestMsgResponse,
  Message,
} from '@/services/messengerService/lib/messengerEndpoints.types'
import { messageActions } from '@/services/messengerService/store/slice/messengerEndpoints.slice'
import { getCookie } from 'cookies-next'
import { Socket, io } from 'socket.io-client'

const queryParams = {
  query: {
    accessToken: getCookie('accessToken'),
  },
}

let socket: Socket

function getSocket() {
  if (!socket) {
    socket = io('https://inctagram.work', queryParams)
  }

  return socket
}

export const messengerEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getArrayOfLastMsg: builder.query<
      GetMessengerArrayOfLatestMsgResponse,
      GetMessengerArrayOfLatestMsgParams
    >({
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState, updateCachedData }
      ) {
        try {
          await cacheDataLoaded
          // the /chat-messages endpoint responded already

          const socket = getSocket()
          const messageData = (getState() as RootState).messageReducer?.messageData

          socket.on(MESSENGER_WS_EVENT.MESSAGE_SENT, (message: Message, cb) => {
            updateCachedData(draft => {
              const hasMsg = draft?.items?.find(msg => msg.receiverId === message.receiverId)

              if (hasMsg) {
                hasMsg.messageText = message.messageText
                hasMsg.status = message.status
              }
              cb({ messageId: message.id, status: 'RECEIVED' })
            })
          })
          socket.on(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, (message: Message) => {
            if (Array.isArray(message)) {
              updateCachedData(draft => {
                draft.items = draft?.items?.map(msg =>
                  msg.receiverId === message[message?.length - 1].receiverId
                    ? {
                        ...msg,
                        messageText: message[message?.length - 1].messageText,
                        status: message[message?.length - 1].status,
                      }
                    : msg
                )
              })
              messageData &&
                dispatch(
                  messageActions.updateFirstMessage({
                    messageText: message[0].messageText,
                    status: message[0].status,
                  })
                )
            } else {
              updateCachedData(draft => {
                draft.items = draft?.items?.map(msg =>
                  msg.receiverId === message.receiverId
                    ? {
                        ...msg,
                        messageText: message.messageText,
                        status: message.status,
                      }
                    : msg
                )
              })

              messageData &&
                dispatch(
                  messageActions.updateFirstMessage({
                    messageText: message.messageText,
                    status: message.status,
                  })
                )
            }
          })
          await cacheEntryRemoved
          socket.off(MESSENGER_WS_EVENT.RECEIVE_MESSAGE)
          socket.close()
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      providesTags: ['LastMessages'],
      query: params => {
        return {
          method: 'GET',
          params: params || {},
          url: `messanger`,
        }
      },
    }),
    getDialogMessages: builder.query<GetDialogMessagesResponse, GetDialogMessagesParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.dialogPartnerId !== previousArg?.dialogPartnerId
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.cursor === undefined) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...newItems.items)
        }
      },
      async onCacheEntryAdded(
        { dialogPartnerId },
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) {
        try {
          await cacheDataLoaded
          // the /chat-messages endpoint responded already

          const socket = getSocket()

          socket.on(MESSENGER_WS_EVENT.MESSAGE_SENT, (message: Message) => {
            updateCachedData(draft => {
              if (dialogPartnerId === message.ownerId) {
                draft.items?.unshift(message)
              }
            })
          })
          socket.on(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, (message: Message) => {
            if (Array.isArray(message)) {
              updateCachedData(draft => {
                draft.items = draft?.items?.map(draftMsg => {
                  const hasMsg = message.find(msg => msg.id === draftMsg.id)

                  return hasMsg ? { ...draftMsg, status: hasMsg.status } : draftMsg
                })
              })
            } else {
              updateCachedData(draft => {
                const hasMsg = draft?.items?.find(msg => msg.id === message.id)

                if (hasMsg) {
                  hasMsg.status = message.status
                } else {
                  draft.items.unshift(message)
                }
              })
            }
          })
          await cacheEntryRemoved
          socket.on('disconnect', () => {})
          socket.off(MESSENGER_WS_EVENT.MESSAGE_SENT)
          socket.off(MESSENGER_WS_EVENT.RECEIVE_MESSAGE)
          socket.close()
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      query: ({ dialogPartnerId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `messanger/${dialogPartnerId}`,
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}?sent=${queryArgs.dialogPartnerId}`
      },
    }),
    sendMessage: builder.mutation<Message, { message: string; receiverId: number }>({
      queryFn: params => {
        const socket = getSocket()

        return new Promise(resolve => {
          socket.emit(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, params, (message: Message) => {
            resolve({ data: message })
          })
        })
      },
    }),
    updateMessagesStatus: builder.mutation<any, { ids: number[] }>({
      invalidatesTags: ['LastMessages'],
      query: params => {
        return {
          body: params,
          method: 'PUT',
          url: 'messanger',
        }
      },
    }),
  }),
})

export const {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery,
  useSendMessageMutation,
  useUpdateMessagesStatusMutation,
} = messengerEndpoints
