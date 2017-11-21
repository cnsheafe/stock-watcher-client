import * as React from 'react';
import Search from './Search';
import SuggestionsList from './SuggestionsList';
export default class SearchPage extends React.Component {

    render() {
        return [<Search/>, <SuggestionsList/>];
    }
}