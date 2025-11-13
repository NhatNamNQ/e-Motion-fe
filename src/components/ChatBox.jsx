import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { chatService } from '@/features/profile/service/chatService'
import { formatTime } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý ảo của e-Motion. Tôi có thể giúp gì cho bạn về dịch vụ thuê xe điện?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    // Auto scroll to bottom when new message arrives
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await chatService.sendMessage(inputMessage)

      const botMessage = {
        id: Date.now() + 1,
        text: response || 'Xin lỗi, tôi không thể trả lời câu hỏi này.',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      toast.error(error.message || 'Không thể gửi tin nhắn')

      const errorMessage = {
        id: Date.now() + 1,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button - Fixed bottom right */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size='lg'
          className='bg-secondary hover:bg-secondary/90 fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full p-0 shadow-lg transition-all hover:scale-110'
        >
          <MessageCircle className='h-6 w-6' />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className='fixed right-6 bottom-6 z-50 flex w-[500px] flex-col gap-0 overflow-hidden py-0 shadow-2xl sm:w-[420px]'>
          {/* Header */}
          <CardHeader className='bg-secondary flex flex-row items-center justify-between space-y-0 p-4 text-white'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20'>
                <Bot className='h-5 w-5' />
              </div>
              <CardTitle className='text-lg font-semibold'>Trợ lý e-Motion</CardTitle>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(false)}
              className='h-8 w-8 hover:bg-white/20'
            >
              <X className='h-5 w-5' />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className='flex-1 p-0'>
            <ScrollArea ref={scrollAreaRef} className='h-[55vh]'>
              <div className='space-y-4 p-4'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-2',
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white',
                        message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                      )}
                    >
                      {message.sender === 'user' ? (
                        <User className='h-4 w-4' />
                      ) : (
                        <Bot className='h-4 w-4' />
                      )}
                    </div>
                    <div
                      className={cn(
                        'flex max-w-[70%] flex-col gap-1',
                        message.sender === 'user' ? 'items-end' : 'items-start'
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-2 text-sm',
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        <ReactMarkdown
                          components={{
                            p: (props) => (
                              <p {...props} className='m-0 break-words whitespace-pre-wrap' />
                            ),
                            ul: (props) => (
                              <ul {...props} className='m-0 ml-4 list-disc space-y-1' />
                            ),
                            li: (props) => <li {...props} className='ml-2' />,
                            strong: (props) => <strong {...props} className='font-semibold' />
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                      <span className='text-muted-foreground text-xs'>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className='flex gap-2'>
                    <div className='bg-secondary text-secondary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full'>
                      <Bot className='h-4 w-4' />
                    </div>
                    <div className='bg-muted flex items-center gap-1 rounded-2xl px-4 py-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span className='text-muted-foreground text-sm'>Đang trả lời...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <CardFooter className='border-t p-4'>
            <div className='flex w-full gap-2'>
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Nhập tin nhắn...'
                disabled={isLoading}
                className='flex-1'
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size='icon'
                className='bg-secondary hover:bg-secondary/90'
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Send className='h-4 w-4' />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

export default ChatBox
