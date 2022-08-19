import * as React from 'react';
import { List } from 'react-native-paper';
import { Divider } from 'react-native-paper/lib/commonjs';

const MyComponent = () => {
  return (
    <List.Section title="Tap to show/hide answers">
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
        <List.Item title="Temporary Answer" 
        titleNumberOfLines={5}/>
      </List.Accordion>
      <Divider/>
      <List.Accordion
        title="How do I filter by variables on the Bird Feed?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Temporary Answer" 
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
        title="What are List View and Peck View?"
        theme={{ colors: { primary: '#560CCE' }}} 
        titleNumberOfLines={5}>
        <List.Item title="Temporary Answer" 
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