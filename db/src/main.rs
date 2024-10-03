use pg_query::Node;
use prost::Message;
use serde::Deserialize;
use base64::prelude::*;
use serde_binary::{binary_stream::Endian, Deserializer};

pub mod pg_query {
    include!("gen/pg_query.rs");
    //include!("gen/pg_query.serde.rs");

    //include!(concat!(env!("OUT_DIR"), "/pg_query.rs"));
    //include!(concat!(env!("OUT_DIR"), "/pg_query.serde.rs"));
}

fn main() {
    const S: &str = "{\"ColumnRef\":{\"fields\":[{\"String\":{\"sval\":\"aasdad\"}}]}}";
    let mut des = serde_json::Deserializer::from_str(S);

    let d = pg_query::Node::deserialize(&mut des);

   match d.as_ref().unwrap().node.as_ref() {
    Some( pg_query::node::Node::ColumnRef(pg_query::ColumnRef { fields, ..})) => {
        match &fields[0].node {
            Some(pg_query::node::Node::String ( pg_query::String { sval } )) => {
                println!("Hello {} ", sval);
            }
            _ => {}
        }
    }
    _ => {}
   } 
   println!("{:?}", d.as_ref().unwrap().node);

   let mut buf = Vec::new();
   buf.reserve(d.as_ref().unwrap().node.as_ref().unwrap().encoded_len());

   d.as_ref().unwrap().encode(&mut buf).unwrap();

  // assert_eq!(BASE64_STANDARD.encode(buf.clone()), "0gMNCgu6DwgKBmFhc2RhZA==");
   

   let base64 = "0gMNCgu6DwgKBmFhc2RhZA==";
   let bin = BASE64_URL_SAFE.decode(base64).unwrap();

   let d: Node = Message::decode(&bin[..]).unwrap();
   //let d = serde_binary::from_vec::<Node>(buf, Endian::default()).unwrap();

   println!("{:?}\n", d.node);

   match &d.node {
    Some(pg_query::node::Node::ColumnRef(pg_query::ColumnRef { fields, ..})) => {
        match &fields[0].node {
            Some(pg_query::node::Node::String ( pg_query::String { sval } )) => {
                println!("Hello {} ", sval);
            }
            _ => {}
        }
    }
    _ => {}
   } 

    
}
