import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

interface AgentProps {
    userName: string;
}

const Agent: React.FC<AgentProps> = ({ userName }) => {
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;
    const messages = [
        'whats your name?',
        'My name is Abdul Rauf Jatoi',
    ];

    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image src='/ai-avatar.png' alt='AI Interviewer' width={65} height={54} className='object-cover' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI </h3>
                </div>
                <div className='card-border'>
                    <div className='card-content'>
                        <Image src='/rauf.jpeg' alt='User Avatar' width={120} height={120} className='rounded-full object-cover' />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>
            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={lastMessage} className={clsx('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {lastMessage} 
                        </p>

                    </div>

                </div>
            )}

            <div className='w-full flex justify-center'>
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className='relative btn-call'>
                        <span className={clsx('absolute animate-ping rounded-full opacity-75', {
                            'hidden': callStatus !== CallStatus.CONNECTING
                        })} />
                        <span>{callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Call' : '...'}</span>
                    </button>
                ) : (
                    <button className='btn-disconnect'>End</button>
                )}
            </div>
        </>
    );
};

export default Agent;
