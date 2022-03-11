import React from 'react';
import NFTList from './NFTList';
import { Button } from '@mui/material';

interface ViewProps {
  attributes: Object[];
  setAttributes: (any) => void;
}

interface ViewState {
  total: number;
  nftDetails: {
    trait_type: string;
    value: string;
  }[];
  view: boolean;
}

class NFTView extends React.Component<ViewProps, ViewState> {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      nftDetails: [
        {
          trait_type: '',
          value: '',
        },
      ],
      view: false,
    };
  }
  // handleCallback = (childData) => {
  //   this.state.nftDetails.push(childData);
  // };

  handleChange = (e) => {
    if (['trait_type', 'value'].includes(e.target.name)) {
      let nftDetails = [...this.state.nftDetails];
      nftDetails[e.target.dataset.id][e.target.name] = e.target.value;

      console.log(this.state.nftDetails);
      this.props.setAttributes(this.state.nftDetails);
    } else {
      this.setState({ [e.target.name]: e.target.value } as any);
      this.props.setAttributes(this.state.nftDetails);
      console.log(this.state.nftDetails, 'el');
      // this.props.setAttributes({ [e.target.name]: e.target.value } as any);
    }
  };
  addNewRow = (e) => {
    if (this.state.total < 6) {
      this.setState((prevState) => ({
        total: prevState.total + 1,
        nftDetails: [
          ...prevState.nftDetails,
          {
            trait_type: '',
            value: '',
          },
        ],
      }));
    }
  };

  deteteRow = (index) => {
    this.setState((prevState) => ({
      total: prevState.total - 1,
      nftDetails: this.state.nftDetails.filter((s, sindex) => index !== sindex),
    }));
  };

  clickOnDelete(record) {
    this.setState((prevState) => ({
      total: prevState.total - 1,
      nftDetails: this.state.nftDetails.filter((r) => r !== record),
    }));
    console.log(record);
  }
  changeView = () => {
    this.setState({ view: true });
  };
  render() {
    let { total, nftDetails, view } = this.state;
    // console.log(nftDetails, 'nftDetails');
    return (
      <div>
        <form onChange={this.handleChange}>
          <div style={{ marginTop: 20 }}>
            <div>
              <h3 style={{ marginLeft: 10 }}> Enter NFT Attributes</h3>
              <NFTList
                add={this.addNewRow}
                delete={this.clickOnDelete.bind(this)}
                nftDetails={nftDetails}
                current={total}
                disp={view}
              />
              <Button sx={{ margin: 2 }} variant="contained" onClick={this.addNewRow}>
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default NFTView;
