import * as React from 'react';
import { List } from 'react-native-paper';
import { Divider } from 'react-native-paper/lib/commonjs';

const MyComponent = () => {
  return (
    <List.Section>
      <List.Accordion
        title="How do I upload images to my profile?" 
        theme={{ colors: { primary: '#560CCE' }}}>
        <List.Item 
        title="Click on the 'Photos' icon in the top right of the profile page.
          Allow Bird Nest to access your photo library if you haven't already.
          Then select up to 9 images to add to your profile." 
          titleNumberOfLines={5} />
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="Can I find roommates even if I don't have housing?" 
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item 
        title="Of course!
        Whether you have a home or are a bird without a nest, we can help." 
        titleNumberOfLines={5} />
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I know if someone has swiped right on me?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Simple! Bird Nest alerts users through push notifications
        when their profile has been swiped right on. These notification can also be
        viewed on the Chirp Notifications screen (accessed through the
        Bird Feed screen)." 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I filter by variables on the Bird Feed?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Tap on the filters button below the header on
        the Bird Feed screen. Then, adjust as many of the variables as you would
        like, to refine your search." 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="What are List View and Peck View?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Bird Nest provides two methods for viewing user profiles:
        (1) List View: a top-to-bottom list of user profiles. Or
        (2) Peck View: a swipeable, dating app inspired card view of user profiles." 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I switch between the List View and Peck View?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="By default, Bird Nest launches in List View.
        Click on the 'View Change' button in the top right of
        the Bird Feed page.
        Next, tap on 'view users' in the center of the Peck View page to view users in Peck View." 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I edit variables and questionnaire answers?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Temporary Answer" 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How will I know when I've matched with another user?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Bird Nest will notify users via push notifications
        when they have matched with others. Additionally, these notifications
        will also appear within the Chirp Notifications page (accessed through the
        Bird Feed screen)." 
        titleNumberOfLines={10}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="When will I get notifications?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Bird Nest will send Chirp Notifications if:
        (1) You and another user match.
        (2) Another user pecks yes on your profile. Or
        (3) You receive a new message in the Messenger Pigeon.
        These notifications will appear organized under the
        Chirp Notifications screen, which can be accessed by tapping the
        bird icon on the top right of the Bird Feed screen." 
        titleNumberOfLines={10}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="What do the user roles mean?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Flamingo: I have housing that I will live in & need another roommate or
                roommates. Owl: I have housing, am not living there, and need people to live in
                the space (sublease). Parrot: I do not have housing, and I am looking for housing that has
                people living there with whom I want to be roommates. Penguin: I do not have housing, and
                I am looking for roommates to look for housing with. Duck: I do not have housing, and I
                already have friends who I want to room with (who are also looking for housing with me)."
        titleNumberOfLines={15}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="Can anyone join Bird Nest?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Bird Nest was designed to assist students in finding off-campus housing and roommates.
        Presently, our app is only open to UCSD students,
        however the scope of the app may grow with time." 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I get a girlfriend/boyfriend?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="While Bird Nest takes its inspiration for matching users from popular dating apps,
        Bird Nest itself is NOT a dating app.
        Although Deondre could draw up a partner for you on his whiteboard,
        our goal is to match likeminded individuals with one another to simplify peoples search for housing and/or roommates." 
        titleNumberOfLines={10}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I fix an AxiosError?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Ask Tony" 
        titleNumberOfLines={5}/>
      </List.Accordion>
    </List.Section>
  );
};

export default MyComponent;