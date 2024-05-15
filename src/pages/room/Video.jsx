import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';

function Video() {
    const { roomid } = useParams();
    const auth = useSelector((state) => state.auth.userData);
    const meetingContainerRef = useRef(null);

    useEffect(() => {
        const loadMeeting = async () => {
            if (!auth) return;
            const appId = 318697823;
            const serverSecret = "61f4daa84112155309db86fe14674bb0";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                roomid,
                auth.$id.toString(),
                auth.name
            );
            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: meetingContainerRef.current,
                sharedLinks: [{
                    name: "Copy link",
                    url: `https://lifelink-indol.vercel.app/video/${roomid}`
                }],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall
                },
                showScreenSharingButton: false
            });
        };

        loadMeeting();

        // if (!window.location.hash) {
        //     window.location = window.location + '#loaded';
        //     window.location.reload();
        // }
        
    }, [auth, roomid]);

    return (
        <div className='my-4 '>
            <div className='h-[720px]' ref={meetingContainerRef} />
        </div>
    );
}

export default Video;
