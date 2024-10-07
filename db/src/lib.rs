// use deno_bindgen::deno_bindgen;
use prost::Message;

pub mod pg_query {
    include!("gen/pg_query.rs");

}
// #[deno_bindgen] -- todo why is deno bindgen hanging?
#[no_mangle]
fn query(serialized: *mut u8, length: u32) -> () {
    query_impl( unsafe {std::slice::from_raw_parts(serialized, length as usize) })
}

fn query_impl(serialized: &[u8]) {
    let d: pg_query::Node = Message::decode(serialized).unwrap();

   println!("{:?}\n", d.node);
}